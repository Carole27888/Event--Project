"""initial migration

Revision ID: 8a4baf82ac4d
Revises: 
Create Date: 2025-04-05 17:32:38.864024

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8a4baf82ac4d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('role', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('created_by', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('feedback',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('comment', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('registration',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(), nullable=False),
    sa.Column('payment_status', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('registration')
    op.drop_table('feedback')
    op.drop_table('event')
    op.drop_table('user')
    # ### end Alembic commands ###
