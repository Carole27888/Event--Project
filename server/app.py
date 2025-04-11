from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from sqlalchemy import MetaData
from models import db, User, Event, Registration, Feedback

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///event.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'super_secret_key'  
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db.init_app(app)

migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

def is_logged_in():
    return 'user_id' in session

@app.route('/')
def index():
    return "Karibu Eventify"

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not all(key in data for key in ('name', 'email', 'password', 'role')):
        return jsonify({'message': 'Missing required fields'}), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password,
        role=data['role']
    )
    db.session.add(new_user)
    db.session.commit()

    session['user_id'] = new_user.id

    return jsonify({
        'message': 'User created successfully',
        'user': {'id': new_user.id, 'name': new_user.name, 'role': new_user.role}
    }), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not all(key in data for key in ('email', 'password')):
        return jsonify({'message': 'Missing required fields'}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user or not bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    session['user_id'] = user.id

    return jsonify({
        'message': 'Login successful',
        'user': {'id': user.id, 'name': user.name, 'role': user.role}
    }), 200

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logout successful'}), 200

@app.route('/me', methods=['GET'])
def current_user():
    if not is_logged_in():
        return jsonify({'message': 'Not logged in'}), 401

    user = User.query.get(session['user_id'])
    return jsonify({'id': user.id, 'name': user.name, 'role': user.role})

@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    events_data = [{
        "id": event.id,
        "type": event.name,
        "location": event.location,
        "date": event.date,
        "details": event.description,
        "created_by": event.created_by
    } for event in events]
    return jsonify({"events": events_data})

@app.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify({
        "id": event.id,
        "name": event.name,
        "description": event.description,
        "date": event.date,
        "location": event.location,
        "created_by": event.created_by
    })

# @app.route('/events', methods=['POST'])
# def create_event():
#     if not is_logged_in():
#         return jsonify({"message": "You must be logged in to create an event"}), 401

#     data = request.get_json()
#     if not all(field in data for field in ["name", "description", "date", "location"]):
#         return jsonify({"message": "Missing fields"}), 400

#     new_event = Event(
#         name=data['name'],
#         description=data['description'],
#         date=data['date'],
#         location=data['location'],
#         created_by=session['user_id']
#     )
#     db.session.add(new_event)
#     db.session.commit()

#     return jsonify({
#         "message": "Event created successfully",
#         "event": {"id": new_event.id}
#     }), 201

@app.route('/events', methods=['POST'])
def create_event():
    if not is_logged_in():
        print("Session does not have user_id.")
        return jsonify({"message": "You must be logged in to create an event"}), 401

    data = request.get_json()
    if not all(field in data for field in ["name", "description", "date", "location"]):
        return jsonify({"message": "Missing fields"}), 400

    new_event = Event(
        name=data['name'],
        description=data['description'],
        date=data['date'],
        location=data['location'],
        created_by=session['user_id']
    )
    db.session.add(new_event)
    db.session.commit()

    return jsonify({
        "message": "Event created successfully",
        "event": {"id": new_event.id}
    }), 201


@app.route('/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    if not is_logged_in():
        return jsonify({"message": "You must be logged in to update an event"}), 401

    event = Event.query.get_or_404(event_id)

    if event.created_by != session['user_id']:
        return jsonify({"message": "You do not have permission to edit this event"}), 403

    data = request.get_json()
    if 'name' in data:
        event.name = data['name']
    if 'description' in data:
        event.description = data['description']
    if 'date' in data:
        event.date = data['date']
    if 'location' in data:
        event.location = data['location']

    db.session.commit()

    return jsonify({
        "message": "Event updated successfully",
        "event": {
            "id": event.id,
            "name": event.name,
            "description": event.description,
            "date": event.date,
            "location": event.location
        }
    })

@app.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    if not is_logged_in():
        return jsonify({"message": "You must be logged in to delete an event"}), 401

    event = Event.query.get_or_404(event_id)

    if event.created_by != session['user_id']:
        return jsonify({"message": "You do not have permission to delete this event"}), 403

    db.session.delete(event)
    db.session.commit()

    return jsonify({"message": "Event deleted successfully"}), 200

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not all(key in data for key in ('user_id', 'event_id', 'status')):
        return jsonify({'message': 'Missing required fields'}), 400

    registration = Registration(
        user_id=data['user_id'],
        event_id=data['event_id'],
        status=data['status']  
    )
    db.session.add(registration)
    db.session.commit()
    return jsonify({'message': 'Registration successful'}), 201

@app.route('/feedback', methods=['POST'])
def create_feedback():
    data = request.get_json()
    if not all(key in data for key in ('user_id', 'event_id', 'rating')):
        return jsonify({'message': 'Missing required fields'}), 400

    feedback = Feedback(
        user_id=data['user_id'],
        event_id=data['event_id'],
        rating=data['rating'],
        comment=data.get('comment')
    )
    db.session.add(feedback)
    db.session.commit()
    return jsonify({'message': 'Feedback submitted successfully'}), 201


@app.route('/feedback/<int:event_id>', methods=['GET'])
def get_feedback(event_id):
    feedback_list = Feedback.query.filter_by(event_id=event_id).all()
    return jsonify([{
        'id': f.id,
        'user_id': f.user_id,
        'rating': f.rating,
        'comment': f.comment
    } for f in feedback_list])

if __name__ == '__main__':
    app.run(debug=True)
