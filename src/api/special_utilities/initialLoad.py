from api.models import db, Character,Planet
import requests


def initial_character_load ():
    response_characters = requests.get("https://swapi.dev/api/people/")
    json_response = response_characters.json()
    print(json_response)
    for index,person in enumerate (json_response['results']):
        person_info=Character(name=person['name'],local_id=index+1, birth_day=person['birth_year'], gender = person['gender'], height = person['height'],skin_color = person['skin_color'],eye_color =person['eye_color'],hair_color=person["hair_color"])
        db.session.add(person_info)
    
    db.session.commit()

def initial_planet_load():
    response_planets = requests.get("https://swapi.dev/api/planets")
    json_response = response_planets.json()
    print(json_response)
    for index, planet in enumerate (json_response['results']):
        planet_info=Planet(name=planet['name'],local_id=index+1, climate=planet['climate'], population=planet['population'],terrain = planet['terrain'], rotation_period = planet['rotation_period'],orbital_period =planet['orbital_period'], diameter=planet['diameter'], surface_water=planet["surface_water"])
        db.session.add(planet_info)
    
    db.session.commit()

def initial_loader():
    initial_planet_load()
    initial_character_load()