import json
from map import Map

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

        # Convert JSON data into Map objects
        world_map = Map.from_dict(world_map)
        return world_map
    
    @staticmethod
    def save_map(map : Map):
        world_map = map.to_dict()
        with open("map.json", "w") as file:
            json.dump(world_map ,file, indent=4)