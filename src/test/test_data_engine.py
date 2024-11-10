import unittest
from unittest.mock import mock_open, patch, MagicMock
import json
from data_engine import DataEngine
from map import Map

class TestDataEngine(unittest.TestCase):

    @patch("builtins.open", new_callable=mock_open, read_data='[{"name": "Place A", "coordinates": [0, 0]}]')
    @patch("json.load")
    def test_load_map_existing_file(self, mock_json_load, mock_file_open):
        # Mock the output of json.load to return a list with map data
        mock_json_load.return_value = [{"name": "Place A", "coordinates": [0, 0]}]

        # Mock Map.from_dict to return a Map instance
        mock_map = MagicMock(spec=Map)
        Map.from_dict = MagicMock(return_value=mock_map)

        # Call load_map
        result = DataEngine.load_map()

        # Check if the file was opened in read mode
        mock_file_open.assert_called_once_with("map.json", "r")

        # Check if Map.from_dict was called and if the result contains the mock_map
        Map.from_dict.assert_called_once_with({"name": "Place A", "coordinates": [0, 0]})
        self.assertEqual(result, [mock_map])

    @patch("builtins.open", new_callable=mock_open)
    @patch("json.load", side_effect=FileNotFoundError)
    @patch("json.dump")
    def test_load_map_file_not_found(self, mock_json_dump, mock_json_load, mock_file_open):
        # Call load_map
        result = DataEngine.load_map()

        # Check if the file was opened in read mode and then in write mode to create it
        mock_file_open.assert_any_call("map.json", "r")
        mock_file_open.assert_any_call("map.json", "w")

        # Check if json.dump was called to write an empty list to the file
        mock_json_dump.assert_called_once_with([], mock_file_open())

        # Verify the result is an empty list
        self.assertEqual(result, [])

    @patch("builtins.open", new_callable=mock_open)
    @patch("json.dump")
    def test_save_map(self, mock_json_dump, mock_file_open):
        # Create a mock Map instance and set its to_dict method
        mock_map = MagicMock(spec=Map)
        mock_map.to_dict.return_value = [{"name": "Place A", "coordinates": [0, 0]}]

        # Call save_map with the mock map
        DataEngine.save_map(mock_map)

        # Check if the file was opened in write mode
        mock_file_open.assert_called_once_with("map.json", "w")

        # Check if json.dump was called with the correct data
        mock_json_dump.assert_called_once_with([{"name": "Place A", "coordinates": [0, 0]}], mock_file_open(), indent=4)

if __name__ == "__main__":
    unittest.main()