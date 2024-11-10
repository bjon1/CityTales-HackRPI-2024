import unittest
from destination import Destination
from map import Map

class TestMap(unittest.TestCase):
    def setUp(self):
        # Create destination instances with specific coordinates and radius
        self.destination1 = Destination("Destination 1", "Historical Info", [0, 0], 5, False, None)
        self.destination2 = Destination("Destination 2", "Historical Info", [10, 10], 5, False, None)

        # Create a Map instance with the destination list
        self.map = Map([self.destination1, self.destination2])

    def test_check_radius_explored_within_radius(self):
        # Test with a point within the exploration radius
        explored_destinations = self.map.check_radius_explored([0, 0], 10)
        self.assertEqual(len(explored_destinations), 1)
        self.assertTrue(self.destination1.is_explored)
        
    def test_check_radius_explored_outside_radius(self):
        # Test with a point outside the exploration radius
        explored_destinations = self.map.check_radius_explored([20, 20], 5)
        self.assertEqual(len(explored_destinations), 0)
        self.assertFalse(self.destination1.is_explored)
        self.assertFalse(self.destination2.is_explored)

    def test_get_explored_destinations(self):
        # Manually set one destination to explored and test retrieval
        self.destination1.is_explored = True
        explored_destinations = self.map.get_explored_destinations()
        self.assertIn(self.destination1, explored_destinations)
        self.assertNotIn(self.destination2, explored_destinations)

    def test_to_dict(self):
        # Test that to_dict produces a correct dictionary representation
        map_dict = self.map.to_dict()
        self.assertIsInstance(map_dict, list)
        self.assertEqual(len(map_dict), 2)
        self.assertEqual(map_dict[0]["name"], "Destination 1")
        self.assertEqual(map_dict[1]["name"], "Destination 2")

    def test_from_dict(self):
        # Test that from_dict reconstructs a Map object correctly
        map_dict = [
            {"name": "Destination 1", "historical_data": "Historical Info", "coordinates": [0, 0], "radius": 5, "is_explored": False, "image": None},
            {"name": "Destination 2", "historical_data": "Historical Info", "coordinates": [10, 10], "radius": 5, "is_explored": False, "image": None}
        ]
        reconstructed_map = Map.from_dict(map_dict)
        self.assertEqual(len(reconstructed_map.get_destination_list()), 2)
        self.assertEqual(reconstructed_map.get_destination_list()[0].name, "Destination 1")
        self.assertEqual(reconstructed_map.get_destination_list()[1].coordinates, [10, 10])

    def test_initialization(self):
        # Test initialization of the map with a list of destinations
        self.assertEqual(len(self.map.get_destination_list()), 2)
        self.assertEqual(self.map.get_destination_list()[0].name, "Destination 1")
        self.assertEqual(self.map.get_destination_list()[1].name, "Destination 2")

if __name__ == "__main__":
    unittest.main()