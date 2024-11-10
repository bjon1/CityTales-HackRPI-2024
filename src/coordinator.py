from map import Map
from data_engine import DataEngine

class Coordinator():
    def __init__(self):
        data_engine = DataEngine()
        self.map : Map = data_engine.load_map()

    def get_map_dict(self):
        map = self.map.to_dict()
        return map

    def check_radius_explored(self, coordinates, radius):
        updated_list = self.map.check_radius_explored(coordinates, radius)
        updated_list = [destination.to_dict() for destination in updated_list]
        return updated_list