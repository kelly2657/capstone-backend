import React, { useState } from 'react';

export default function Goal(props) {
  const [mygoal, setGoal] = useState("목표설정하기");
  const [isGoal, settingGoal] = useState(false);

  const ClickToSet = () => {
    settingGoal(true);
  }
  
  const GoalUpdate = (event) => {
    setGoal(event.target.value);
  };

  const MaintainGoal = () => {
    settingGoal(false);
  }

  return (
    <div class="goal" onClick={ClickToSet}>
      {isGoal ? (
        <textarea value={mygoal} onChange={GoalUpdate} onBlur={MaintainGoal}/>
      ) : (
      <p>
        <strong>My Goal</strong>  :  {mygoal}
        </p>
        )}

    </div>
  );
}
