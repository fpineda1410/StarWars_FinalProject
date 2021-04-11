from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import safe_str_cmp

db = SQLAlchemy()

#todo hash and salt passwords
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)
    favorites_planets= db.relationship('FavoritePlanet', backref='user', lazy=True)
    favorites_characters= db.relationship('FavoriteCharacter', backref='user', lazy=True)

    def __repr__(self):
        return '<User %s>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

    def check_password(self, password):
        return safe_str_cmp(password, self.password)

class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    local_id = db.Column(db.Integer,nullable=False,unique=True) #id que genera la base de datos index en lugar de id
    name = db.Column(db.String(100))
    birth_day = db.Column(db.String(100))
    gender = db.Column(db.String(100))
    height = db.Column(db.Integer)
    skin_color = db.Column(db.String(100))
    hair_color = db.Column(db.String(100))
    eye_color = db.Column(db.String(100))
    homeworld=db.Column(db.String(100))
    favorite_id = db.relationship('FavoriteCharacter', backref='character', lazy=True)
    
    def __repr__(self):
        return '<Character %s>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "birth_day": self.birth_day,
            "gender": self.gender,
            "height": self.height,
            "skin_color": self.skin_color,
            "hair_color": self.hair_color,
            "eye_color": self.eye_color,
            # do not serialize the password, its a security breach
        }

class Planet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    #id local que no dependa del registro
    local_id = db.Column(db.Integer,nullable=False,unique=True)
    name = db.Column(db.String(100))
    climate = db.Column(db.String(100))
    population = db.Column(db.String(100))
    terrain = db.Column(db.String(100))
    rotation_period = db.Column(db.String(100))
    orbital_period = db.Column(db.String(100))
    diameter = db.Column(db.String(100))
    surface_water=db.Column(db.String(100))
    favorite_id = db.relationship('FavoritePlanet', backref='planet', lazy=True)
    
    def __repr__(self):
        return '<Planet %s>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "climate": self.climate,
            "population": self.population,
            "terrain": self.terrain,
            "rotation_period": self.rotation_period,
            "orbital_period": self.orbital_period,
            "diameter": self.diameter,
            # do not serialize the password, its a security breach
        }

class FavoritePlanet (db.Model): # favorite_planet
    id = db.Column(db.Integer, primary_key=True)
    planet_id= db.Column(db.Integer,db.ForeignKey(Planet.local_id))
    user_id= db.Column(db.Integer,db.ForeignKey(User.id))

    def serialize(self):
        planet_data=Planet.query.filter_by(id=self.planet_id).first()
        return {
            "id": self.planet_id,
            "name": planet_data.name
        }

class FavoriteCharacter (db.Model): ## favorite_character
    id = db.Column(db.Integer, primary_key=True)
    character_id= db.Column(db.Integer,db.ForeignKey(Character.local_id))
    user_id= db.Column(db.Integer,db.ForeignKey(User.id))
    
    def serialize(self):
        character_data=Character.query.filter_by(id=self.character_id).first()
        return {
            "id": self.character_id,
            "name": character_data.name
        }