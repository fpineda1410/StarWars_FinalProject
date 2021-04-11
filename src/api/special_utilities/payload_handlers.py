from api.models import db, User,Character,Planet,FavoritePlanet,FavoriteCharacter

import collections

#!-----------------------------------------------------------------------------------------------------------------------------------Method to concatenate both serialized FavoriteCharacter and FavoritePlanet lists
def get_merged_lists(current_user_id):
    try:
        favorite_character = FavoriteCharacter.query.filter_by(user_id=current_user_id)
    except:
        favorite_character=[]
    try:
        favorite_planet = FavoritePlanet.query.filter_by(user_id=current_user_id)
    except:
        favorite_character=[]

    favorite_planet_serial = list(map(lambda favorite: favorite.serialize(), favorite_planet))
    favorite_character_serial = list(map(lambda favorite: favorite.serialize(), favorite_character))
    merged_list=favorite_character_serial + favorite_planet_serial
    return merged_list

#!-----------------------------------------------------------------------------------------------------------------------------------Filters

def update_filter_planet (planet_list,current_user_id):
    #*Check if the FavoritePlanet table contains data if not, add the complete planet list
    try:
        #*----------------------------------------------------------------------------------Old Database Depuration
        #* Check the old database state, if the old DB values are not in the ones from the Incoming Data then Delete them
        favorite_planet = FavoritePlanet.query.filter_by(user_id=current_user_id)
        serialized_items = list(map(lambda favorite: favorite.serialize(), favorite_planet))
        for item in serialized_items:
            if item['id'] not in planet_list:
                #if old item in DB is not in the new list emitted by the user then erase it and update DB
                item_to_delete  = FavoritePlanet.query.filter_by(user_id=current_user_id, planet_id=item['id']).first()
                db.session.delete(item_to_delete)
        db.session.commit()
         #*END----------------------------------------------------------------------------------Old Database Depuration
        
        #* Once the database is depurated append the new values if they are not already included
        new_favorite_planet = FavoritePlanet.query.filter_by(user_id=current_user_id)
        new_serialized_items = list(map(lambda favorite: favorite.serialize(), new_favorite_planet))
        new_serialized_items_dict =[]
        for updated_db_item in new_serialized_items:
            new_serialized_items_dict.append(updated_db_item['id'])
        for new_item in planet_list:
            if new_item not in new_serialized_items_dict:
                item_to_add=FavoritePlanet(user_id=current_user_id, planet_id =new_item)
                db.session.add(item_to_add)
        db.session.commit()
    except:
        #!the DB favorite was empty proceed to insert all values in planet_list
        for json_item in planet_list:
            newPlanetFavorite = FavoritePlanet(user_id=current_user_id, planet_id = json_item)
            db.session.add(newPlanetFavorite)
        db.session.commit()


def update_filter_character (character_list,current_user_id):

    #*Check if the FavoriteCharacter table contains data if not, add the complete character list
    try:
        #*----------------------------------------------------------------------------------Old Database Depuration
        #* Check the old database, if the old DB values are not in the ones from the Incoming Data then Deletethem
        favorite_character = FavoriteCharacter.query.filter_by(user_id=current_user_id)
        serialized_items = list(map(lambda favorite: favorite.serialize(), favorite_character))
        for item in serialized_items:
            print( item['id'])
            print(character_list)
            if item['id'] not in character_list:
                print(True)
                #if old item in DB is not in the new list emitted by the user then erase it and update DB
                item_to_delete  = FavoriteCharacter.query.filter_by(user_id=current_user_id, character_id=item['id']).first()
                db.session.delete(item_to_delete)

        db.session.commit()
        #*END----------------------------------------------------------------------------------Old Database Depuration
        
        
        #* Once the database is depurated append the new values if they are not already included
        new_favorite_character = FavoriteCharacter.query.filter_by(user_id=current_user_id)
        new_serialized_items = list(map(lambda favorite: favorite.serialize(), new_favorite_character))
        new_serialized_items_dict =[]
        for updated_db_item in new_serialized_items:
            new_serialized_items_dict.append(updated_db_item['id'])
        for new_item in character_list:
            if new_item not in new_serialized_items_dict:
                item_to_add=FavoriteCharacter(user_id=current_user_id, character_id=new_item)
                db.session.add(item_to_add)

        db.session.commit()
    except:
        #the DB favorite was empty proceed to insert all values in planet_list
        for json_item in character_list:
            newCharacterFavorite = FavoriteCharacter(user_id=current_user_id, character_id = json_item)
            db.session.add(newCharacterFavorite)
        db.session.commit()

#!-----------------------------------------------------------------------------------------------------------------------------------End Filters

#!-----------------------------------------------------------------------------------------------------------------------------------Main method that execute both filters and return the updated favorite data
def update_favorites_lists (payload_from_request,current_user_id):
    planet_list=[]
    characters_list=[]
    #if payload comes with data
    #this data can contain planets or characters or both
    for json_item in payload_from_request:
        # print(type(json_item['category']))
        if (json_item['category'] == "PLANET"):
            planet_list.append(json_item["planet_id"]) #[12,5,6,14] how it will look
        if (json_item['category'] == "CHARACTER"):
            characters_list.append(json_item["character_id"]) #[12,5,6,14] how it will look


    if (len(planet_list)>0):
        planet_list = [x for n, x in enumerate(planet_list) if x not in planet_list[:n]]
        update_filter_planet(planet_list,current_user_id)

    elif (len(planet_list)==0):
        all_favorites=FavoritePlanet.query.filter_by(user_id=current_user_id)
        all_favorites_serialize = list(map(lambda favorite: favorite.serialize(), all_favorites))
        for item in all_favorites_serialize:
            favorite_to_delete=FavoritePlanet.query.filter_by(user_id=current_user_id,planet_id=item['id']).first()
            db.session.delete(favorite_to_delete)
        
        db.session.commit()

    if (len(characters_list)>0):
        character_list = [x for n, x in enumerate(characters_list) if x not in characters_list[:n]]
        update_filter_character(characters_list,current_user_id)
    elif (len(characters_list)==0):
        all_favorites=FavoriteCharacter.query.filter_by(user_id=current_user_id)
        all_favorites_serialize = list(map(lambda favorite: favorite.serialize(), all_favorites))
        
        for item in all_favorites_serialize:
            favorite_to_delete=FavoriteCharacter.query.filter_by(user_id=current_user_id,character_id=item['id']).first()
            db.session.delete(favorite_to_delete)
        
        db.session.commit()

    updated_list = get_merged_lists(current_user_id)
    return updated_list