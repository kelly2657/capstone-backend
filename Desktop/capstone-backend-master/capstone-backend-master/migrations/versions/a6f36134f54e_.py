"""empty message

Revision ID: a6f36134f54e
Revises: 82230b7f0817
Create Date: 2023-05-24 20:34:46.835292

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'a6f36134f54e'
down_revision = '82230b7f0817'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('note', sa.Column('tags', sa.String(length=100), nullable=True))
    op.add_column('note', sa.Column('created_date', sa.DateTime(), nullable=False))
    op.drop_constraint('writer_id', 'note', type_='foreignkey')
    op.add_column('user', sa.Column('uid', sa.String(length=12), nullable=False))
    op.add_column('user', sa.Column('social', sa.String(length=10), nullable=True))
    op.add_column('user', sa.Column('info', sa.String(length=100), nullable=True))
    op.add_column('user', sa.Column('notes', sa.Text(), nullable=True))
    op.add_column('user', sa.Column('schedules', sa.Text(), nullable=True))
    op.drop_column('user', 'password')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('password', mysql.VARCHAR(length=100), nullable=False))
    op.drop_column('user', 'schedules')
    op.drop_column('user', 'notes')
    op.drop_column('user', 'info')
    op.drop_column('user', 'social')
    op.drop_column('user', 'uid')
    op.create_foreign_key('writer_id', 'note', 'user', ['id'], ['id'])
    op.drop_column('note', 'created_date')
    op.drop_column('note', 'tags')
    # ### end Alembic commands ###