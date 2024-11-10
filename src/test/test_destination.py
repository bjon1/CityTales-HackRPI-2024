import unittest
from destination import Destination

class TestDestination(unittest.TestCase):
    
    def setUp(self):
        self.destination = Destination(
            name="Eiffel Tower",
            historical_data="Constructed in 1889",
            coordinates=[48.8584, 2.2945],
            radius=100,
            is_explored=True,
            image="eiffel.jpg"
        )
    
    def test_initialization(self):
        self.assertEqual(self.destination.name, "Eiffel Tower")
        self.assertEqual(self.destination.historical_data, "Constructed in 1889")
        self.assertEqual(self.destination.coordinates, [48.8584, 2.2945])
        self.assertEqual(self.destination.radius, 100)
        self.assertTrue(self.destination.is_explored)
        self.assertEqual(self.destination.image, "eiffel.jpg")
    
    def test_name_setter_and_getter(self):
        self.destination.name = "Louvre Museum"
        self.assertEqual(self.destination.name, "Louvre Museum")
        with self.assertRaises(ValueError):
            self.destination.name = 123  # Non-string should raise ValueError
    
    def test_historical_data_setter_and_getter(self):
        self.destination.historical_data = "World War II site"
        self.assertEqual(self.destination.historical_data, "World War II site")
        with self.assertRaises(ValueError):
            self.destination.historical_data = 123  # Non-string should raise ValueError
    
    def test_coordinates_setter_and_getter(self):
        self.destination.coordinates = [34.0522, -118.2437]
        self.assertEqual(self.destination.coordinates, [34.0522, -118.2437])
        with self.assertRaises(ValueError):
            self.destination.coordinates = "Invalid"  # Non-list should raise ValueError
    
    def test_radius_setter_and_getter(self):
        self.destination.radius = 50
        self.assertEqual(self.destination.radius, 50)
        with self.assertRaises(ValueError):
            self.destination.radius = -10  # Negative integer should raise ValueError
    
    def test_is_explored_setter_and_getter(self):
        self.destination.is_explored = False
        self.assertFalse(self.destination.is_explored)
        with self.assertRaises(ValueError):
            self.destination.is_explored = "yes"  # Non-boolean should raise ValueError
    
    def test_image_setter_and_getter(self):
        self.destination.image = "louvre.jpg"
        self.assertEqual(self.destination.image, "louvre.jpg")
    
    def test_to_dict(self):
        expected_dict = {
            "name": "Eiffel Tower",
            "historical_data": "Constructed in 1889",
            "coordinates": [48.8584, 2.2945],
            "radius": 100,
            "is_explored": True,
            "image": "eiffel.jpg"
        }
        self.assertEqual(self.destination.to_dict(), expected_dict)
    
    def test_from_dict_valid_data(self):
        destination_data = {
            "name": "Statue of Liberty",
            "historical_data": "Gift from France",
            "coordinates": [40.6892, -74.0445],
            "radius": 80,
            "is_explored": False,
            "image": "liberty.jpg"
        }
        destination = Destination.from_dict(destination_data)
        self.assertEqual(destination.name, "Statue of Liberty")
        self.assertEqual(destination.historical_data, "Gift from France")
        self.assertEqual(destination.coordinates, [40.6892, -74.0445])
        self.assertEqual(destination.radius, 80)
        self.assertFalse(destination.is_explored)
        self.assertEqual(destination.image, "liberty.jpg")
    
    def test_from_dict_missing_data(self):
        incomplete_data = {
            "name": "Incomplete Destination",
            "coordinates": [0, 0],
            "radius": 10,
            "is_explored": False
        }
        with self.assertRaises(ValueError):
            Destination.from_dict(incomplete_data)
    
    def test_from_dict_invalid_coordinate_type(self):
        data_with_invalid_coordinates = {
            "name": "Invalid Coordinates",
            "historical_data": "Unknown",
            "coordinates": "not a list",  # This should raise a ValueError in from_dict
            "radius": 30,
            "is_explored": True,
            "image": "unknown.jpg"
        }
        with self.assertRaises(ValueError):
            Destination.from_dict(data_with_invalid_coordinates)

if __name__ == '__main__':
    unittest.main()