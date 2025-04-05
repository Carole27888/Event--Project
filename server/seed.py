from app import app, db
from models import User, Event, Registration, Feedback
from flask_bcrypt import Bcrypt
from faker import Faker
import random

faker = Faker()
bcrypt = Bcrypt(app)

def seed_data():
    with app.app_context():
        db.drop_all()
        db.create_all()

        users = []
        for _ in range(50): 
            password = bcrypt.generate_password_hash(faker.password()).decode('utf-8')
            user = User(
                name=faker.name(),
                email=faker.email(),
                password=password,
                role=random.choice(["attendee", "organizer"])
            )
            users.append(user)

        db.session.add_all(users)
        db.session.commit()

        events = []
        for _ in range(25):  
            event = Event(
                name=faker.bs(),
                description=faker.text(),
                date=faker.date_this_year(),
                location=faker.city(),
                created_by=random.choice(users).id
            )
            events.append(event)

        db.session.add_all(events)
        db.session.commit()

        registrations = []
        for user in users:
            for event in events:
                if random.random() < 0.5:  
                    registration = Registration(
                        user_id=user.id,
                        event_id=event.id,
                        status=random.choice(["confirmed", "interested", "pending"]),
                        payment_status=random.choice(["paid", "unpaid"])
                    )
                    registrations.append(registration)

        db.session.add_all(registrations)
        db.session.commit()

        feedbacks = []
        for user in users:
            for event in events:
                if random.random() < 0.3:  
                    feedback = Feedback(
                        user_id=user.id,
                        event_id=event.id,
                        rating=random.randint(1, 5),
                        comment=faker.sentence()
                    )
                    feedbacks.append(feedback)

        db.session.add_all(feedbacks)
        db.session.commit()

        print(" Seeded database successfully with Faker data!")


if __name__ == '__main__':
    seed_data()
