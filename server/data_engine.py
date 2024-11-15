import json
import base64
from io import BytesIO
from PIL import Image, ImageOps
from map import Map
import requests

class DataEngine():
    @staticmethod
    def load_map():
        try:
            with open("map.json", "r") as file:
                world_map = json.load(file)
        except FileNotFoundError:
            print("The file map.json does not exist.")
            print("Creating map.json file...")

            with open("map.json", "w") as file:
                json.dump([], file)

            print("map.json created")
            return Map([])
        
        DataEngine.preprocess_map(world_map)
        # Convert JSON data into Map objects
        world_map = Map.from_dict(world_map)
        #temporary for demo purposes
        world_map.reset_unlocked_destinations()

        
        return world_map
    
    @staticmethod
    def save_map(map : Map):
        world_map = map.to_dict()
        with open("map.json", "w") as file:
            json.dump(world_map ,file, indent=4)
        

    @staticmethod
    def preprocess_map(map_data: list[dict]) -> list[dict]:
        #TODO Implement preprocessing of map data, such as base64 decoding of images and white border addition
        return map_data

    
# Example usage
if __name__ == "__main__":
    DataEngine.load_map()