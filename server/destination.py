class Destination:
    def __init__(self, name, historical_data, coordinates, is_explored, image):
        self._name: str = name
        self._historical_data: str = historical_data
        self._coordinates: list = coordinates
        self._is_explored: bool = is_explored
        self._image = image
        self._radius = 0

    # Getter and Setter for name
    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if not isinstance(value, str):
            raise ValueError("Name must be a string.")
        self._name = value

    # Getter and Setter for historical_data
    @property
    def historical_data(self):
        return self._historical_data

    @historical_data.setter
    def historical_data(self, value):
        if not isinstance(value, str):
            raise ValueError("Historical data must be a string.")
        self._historical_data = value

    # Getter and Setter for coordinates
    @property
    def coordinates(self):
        return self._coordinates

    @coordinates.setter
    def coordinates(self, value):
        if not isinstance(value, list):
            raise ValueError("Coordinates must be a list.")
        self._coordinates = value

    # Getter and Setter for radius
    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if not isinstance(value, int) or value < 0:
            raise ValueError("Radius must be a non-negative integer.")
        self._radius = value

    # Getter and Setter for is_explored
    @property
    def is_explored(self):
        return self._is_explored

    @is_explored.setter
    def is_explored(self, value):
        if not isinstance(value, bool):
            raise ValueError("is_explored must be a boolean.")
        self._is_explored = value

    # Getter and Setter for image
    @property
    def image(self):
        return self._image

    @image.setter
    def image(self, value):
        # Assuming image can be any type, customize this as needed
        self._image = value

    def to_dict(self):
        return {
            "name": self.name,
            "historical_data": self.historical_data,
            "coordinates": self.coordinates,
            "is_explored": self.is_explored,
            "image": self.image
        }

    @staticmethod
    def from_dict(destination_dict):
        # Retrieve each required field, with a default for 'image' if it's missing
        name = destination_dict.get("name")
        historical_data = destination_dict.get("historical_data")
        coordinates = destination_dict.get("coordinates")
        is_explored = destination_dict.get("is_explored")
        image = destination_dict.get("image", "default_image.jpg")  # Provide default value

        # Check for required fields and raise an error if any are missing
        if None in [name, historical_data, coordinates, is_explored]:
            missing_fields = [
                key for key, value in {
                    "name": name,
                    "historical_data": historical_data,
                    "coordinates": coordinates,
                    "is_explored": is_explored,
                }.items() if value is None
            ]
            raise ValueError(f"Missing fields for Destination: {', '.join(missing_fields)}")
        
        return Destination(name, historical_data, coordinates, is_explored, image)