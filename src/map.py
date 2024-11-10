import math
from destination import Destination
class Map():
    def __init__(self, destination_list):
        self.destination_list : list = destination_list

    def get_destination_list(self):
        return self.destination_list
    
    def check_radius_explored(self, coordinates : list, radius : int):
        x1 = coordinates[0]
        y1 = coordinates[1]
        
        updated_locations = []

        for destination in self.destination_list:
            destination_coordinates = destination.coordinates
            x2 = destination_coordinates[0]
            y2 = destination_coordinates[1]

            # Calculate Euclidian Distance
            distance = math.sqrt( ( ((x2 - x1) ** 2) + ((y2 - y1) ** 2)) )

            if distance <= (radius):
                if not destination.is_explored:
                    destination.is_explored = True
                    updated_locations.append(destination.to_dict())
        
        return updated_locations
    
    def get_explored_destinations(self):
        return [destination for destination in self.destination_list if destination.is_explored]

    def to_dict(self):
        map_dict = [destination.to_dict() for destination in self.destination_list]
        return map_dict

    @staticmethod
    def from_dict(map_dict):
        destination_list = [Destination.from_dict(dest) for dest in map_dict]
        return Map(destination_list)
