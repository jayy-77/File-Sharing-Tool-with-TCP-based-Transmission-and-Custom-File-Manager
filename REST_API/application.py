from flask import Flask
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

class Drink(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(80), unique=True,nullable=False)

@app.route('/')
def index():
	return 'Hellow from jay prajapati'

@app.route('/drinks')
def get_drinks():
	return {"drinks":'drink_data'}
