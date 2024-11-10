import json
from map import Map

class DataEngine():
    @staticmethod
    def load_map():
        try:
            with open("map.json", "r") as file:
                world_map = json.load(file)
        except FileNotFoundError:
            print(f"The file map.json does not exist.")
            print(f"Creating players.json file...")

            with open("map.json", "w") as file:
                json.dump([], file)

            print(f"map.json created")
            return []

        world_map = [Map.from_dict(map_data) for map_data in world_map]
        return world_map
    
    @staticmethod
    def save_map(map : Map):
        world_map = map.to_dict()
        with open("map.json", "w") as file:
            json.dump(world_map ,file, indent=4)