from fastapi import APIRouter, HTTPException, status, Depends, WebSocket, WebSocketDisconnect
import os
from sqlalchemy.orm import Session
from database import get_db
from models import User, Group, Message
from schemas import group_schema, user_schema, message_schema
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from datetime import datetime
import json
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import EmailStr
import smtplib, ssl
from email.mime.text import MIMEText 
from email.mime.multipart import MIMEMultipart

ASE_DIR = os.path.dirname(os.path.abspath(__file__))

router = APIRouter(prefix="/groups")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SECRET_FILE = os.path.join(BASE_DIR, '../secrets.json')
secrets = json.loads(open(SECRET_FILE).read())
KEY = secrets["KEY"]

# 사용자 초대 -> 해당 사용자 이메일로 사용자 초대 
@router.get("/invite/{userID}/{groupID}")
async def inviteUser(userID: int, groupID:int, db:Session=Depends(get_db)) : 
    SMTP_SSL_PORT = 465
    SMTP_SERVER = "smtp.gmail.com"

    SENDER_EMAIL = KEY["mail"]["EMAIL"]
    SENDER_PASSWORD =  KEY["mail"]["PW"]

    RECEIVER_EMAIL = db.query(User).filter(User.id == userID).first().email
    
    context = ssl.create_default_context()

    group_name = db.query(Group).filter(Group.id==groupID).first().title

    link = f"http://localhost:8000/groups/join/{groupID}?user_id={userID}"

    html_content = f"""
    <html>
        <body>
            <p>안녕하세요! StudyAPP에서 사용자에게 {group_name} 그룹 초대를 받았습니다.</p>
            <p>다음 링크를 클릭하세요:</p>
            <form action={link} method="post">
            <button type="submit"><u>그룹초대수락</u></button>
    </form>
        </body>
    </html>
    """

    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = RECEIVER_EMAIL
    msg['Subject'] = "StudyApp 그룹 초대 안내"
    msg.attach(MIMEText(html_content, 'html'))

    with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_SSL_PORT, context=context) as server :
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, msg.as_string())
    
    return {"INVITE" : "SUCCESS"}

# 채팅방 전체 목록 
@router.get("/")
async def getGroups(db:Session = Depends(get_db)) : 
    groups = db.query(Group).all()
    return groups

# 그룹 검색 (title, info 내용 검색)
@router.get("/search")
async def searchGroup(groupKey : str, db:Session = Depends(get_db)) :
    groupByKey =  db.query(Group).filter(Group.title.ilike(f"%{groupKey}%") | Group.info.ilike(f"%{groupKey}%")).all()

    return groupByKey

# 사용자가 참여한 채팅방 목록
@router.get("/mygroup/{userId}")
async def getMyGroups(userId: int, db:Session = Depends(get_db)) : 
    userById =  db.query(User).filter(User.id == userId).first()
    gorup_list = []
    if (userById.__getattribute__("groups") != "") :
        for groupid in ((userById.__getattribute__("groups").rstrip("|")).split("|")) : 
            group = db.query(Group).filter(Group.id == groupid).first()
            gorup_list.append(jsonable_encoder(group.__dict__))
        groupByUser = jsonable_encoder(gorup_list)
    else :
        groupByUser = None
    return groupByUser

# 채팅방 생성
@router.post("/create")
async def createGroups(generate_id:int, group:group_schema.Group, db:Session = Depends(get_db)) : 
    UserbyId = db.query(User).filter(User.id == generate_id).first()
    new_group = Group(title=group.title, generate_id=generate_id, participate_id=f"{generate_id}|", info=group.info, messages="")
    db.add(new_group)
    db.commit()
    db.refresh(new_group)

    UserbyId.groups += str(new_group.id) + "|"
    db.add(UserbyId)
    db.commit()
    db.refresh(UserbyId)

    redirect_url = f"/groups"
    response = RedirectResponse(url=redirect_url, status_code=302)
    return response

# 채팅방 참가 -> 사용자 chat 업뎃, 채팅 db 참가자 업뎃
@router.post("/join/{groupId}")
async def joinGroup(groupId: int, user_id : int, db:Session = Depends(get_db)) :
    if db.query(Group).filter(Group.id == groupId).first() :
        UserbyId = db.query(User).filter(User.id == user_id).first()
        groupIDs = []
        for groupid in ((UserbyId.__getattribute__("groups").rstrip("|")).split("|")) :
            groupIDs.append(groupid)
        if str(groupId) in groupIDs :
            pass
        else : 
            UserbyId.groups += str(groupId) +"|"
            db.add(UserbyId)
            db.commit()
            db.refresh(UserbyId)

        GroupById = db.query(Group).filter(Group.id == groupId).first()
        userIDs = []
        for userid in ((GroupById.__getattribute__("participate_id").rstrip("|")).split("|")) :
            userIDs.append(userid)

        if str(user_id) in userIDs :
            pass
        else : 
            GroupById.participate_id += str(user_id) +"|"
            db.add(GroupById)
            db.commit()
            db.refresh(GroupById)

        redirect_url = f"/groups/{groupId}"
        response = RedirectResponse(url=redirect_url, status_code=302)
        return response
    
# 채팅방 업데이트 ( 수정, 삭제 ) 
@router.post("/{groupId}/upadate")
async def editGroup(group:group_schema.Group, groupId:int, db:Session=Depends(get_db)) :
    GroupbyGroupId = db.query(Group).filter(Group.id == groupId).first()

    if group.title :
        GroupbyGroupId.title = group.title
    if group.info : 
        GroupbyGroupId.info = group.info
    db.commit()
    db.refresh(GroupbyGroupId)
    return GroupbyGroupId

# 그룹 만든 사람만 삭제 가능 -> 연관 
@router.delete("/{groupId}/delete")
async def deleteGroup(groupId:int, userId:int, db:Session=Depends(get_db)) :
    
    ParticipantsId = []
    GroupByGroupId = db.query(Group).filter(Group.id == groupId).first()
    generate_id = GroupByGroupId.__getattribute__("generate_id")
    for participantId in ((GroupByGroupId.__getattribute__("participate_id").rstrip("|")).split("|")) :
        ParticipantsId.append(participantId)


    if int(generate_id) == int(userId) : 
        for usersId in ParticipantsId : 
            ParticipantByGroup = db.query(User).filter(User.id == usersId).first()
            resultGroup = []
            for groupsID in ((ParticipantByGroup.__getattribute__("groups").rstrip("|")).split("|")) :
                if int(groupsID) != int(groupId) : 
                    resultGroup.append(groupsID)
                else :
                    pass
            ParticipantByGroup.groups = ""
            db.commit()
            db.refresh(ParticipantByGroup)
            for groupsIDs in resultGroup : 
                db.query(User).filter(User.id == usersId).first().groups += f"{groupsIDs}|"
            db.commit()
            db.refresh(ParticipantByGroup)
        if GroupByGroupId : 
            db.delete(GroupByGroupId)
            db.commit()

        res = "{Delete : Success}"
    else : 
        res = "{Delete : Fail}"
    
    return res

# 참가자의 그룹 탈퇴 => 그룹 멤버 수정, 해당 참가자가의 그룹 수정 
@router.post("/{groupId}/unregister")
async def unregisterGroup(groupId:int, user_id:int, db:Session=Depends(get_db)) : 
    UserbyID = db.query(User).filter(User.id == user_id).first()
    GroupbyID = db.query(Group).filter(Group.id == groupId).first()

    # 참가자 그룹 수정
    resultGroup = []
    for groupsId in ((UserbyID.__getattribute__("groups").rstrip("|")).split("|")) :
        if int(groupsId) != int(groupId) : 
            resultGroup.append(groupsId)
        else :
            pass
    UserbyID.groups = ""
    db.commit()
    db.refresh(UserbyID)
    for groupID in resultGroup : 
        db.query(User).filter(User.id == user_id).first().groups +=  str(groupID) + "|"
    db.commit()
    db.refresh(UserbyID)

    # 해당 그룹 멤버 수정
    resultMember = []
    for memId in ((GroupbyID.__getattribute__("participate_id").rstrip("|")).split("|")) :
        if int(memId) != int(user_id) : 
            resultMember.append(memId)
        else :
            pass
    GroupbyID.participate_id = ""
    db.commit()
    db.refresh(GroupbyID)
    for memsId in resultMember : 
        db.query(Group).filter(Group.id == groupId).first().participate_id +=  str(memsId) + "|"
    db.commit()
    db.refresh(GroupbyID)

    redirect_url = f"/groups/mygroup/{user_id}"
    response = RedirectResponse(url=redirect_url, status_code=302)
    return response

# 채팅 그룹 (일부 테스크 코드 구현,, 진행중)
class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, list[WebSocket]] = {}

    async def connect(self, group_id: str, websocket: WebSocket):
        await websocket.accept()
        if group_id in self.active_connections:
            self.active_connections[group_id].append(websocket)
        else:
            self.active_connections[group_id] = [websocket]

    def disconnect(self, group_id: str, websocket: WebSocket):
        if group_id in self.active_connections:
            self.active_connections[group_id].remove(websocket)

    async def send_message(self, group_id: str, message: str):
        if group_id in self.active_connections:
            for connection in self.active_connections[group_id]:
                await connection.send_text(message)

    # 알림 전송
    async def send_notification(self, user_id: str, notification: str):
        if user_id in self.active_connections:
            for connection in self.active_connections[user_id]:
                await connection.send_text(notification)
                
manager = ConnectionManager()

@router.websocket("/{group_id}")
async def websocket_endpoint(websocket: WebSocket, group_id: str, username: str = "Anonymous", db:Session=Depends(get_db)):
    await manager.connect(group_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_message(group_id, f"{username}: {data}")
            new_message = Message(chat_id=group_id, writer_id=username, body=data, time=datetime.now())
            db.add(new_message)
            db.commit()
            db.refresh(new_message)
            db.query(Group).filter(Group.id == group_id).first().messages += str(new_message.id) + "|"
            db.commit()

    except WebSocketDisconnect:
        manager.disconnect(group_id, websocket)

@router.get("/{group_id}")
async def get_chat_history(group_id: int, db:Session=Depends(get_db)):
    messageList=[]
    ParticipantList = []
    groupTest = db.query(Group).filter(Group.id == group_id).first()
    if (groupTest.__getattribute__("messages") != ""):
        for messageid in ((groupTest.__getattribute__("messages").rstrip("|")).split("|")) :
            messages = db.query(Message).filter(Message.id == messageid).first()
            messageList.append(jsonable_encoder(messages.__dict__))
        groupTest.messages = jsonable_encoder(messageList)

    generate_id = groupTest.__getattribute__("generate_id")
    groupTest.generate_id = db.query(User).filter(User.id ==  generate_id).first().name
    for participantId in ((groupTest.__getattribute__("participate_id").rstrip("|")).split("|")) :
        ParticipantList.append(db.query(User).filter(User.id ==  participantId).first().name)
    groupTest.participate_id = ParticipantList

    groups_data = {"id": groupTest.id, "title": groupTest.title, "generate_id": groupTest.generate_id, "participate_id" : groupTest.participate_id, "info" : groupTest.info, "messages" : groupTest.messages}
    res = jsonable_encoder(groups_data)

    return res
