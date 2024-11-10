from flask import Flask, jsonify, request
from coordinator import Coordinator
from map import Map
app = Flask(__name__)
coordinator : Coordinator = Coordinator()

@app.route('/')
def api():
    return "Hi this is API"

@app.route('/api/destinations', methods=['GET'])
def get_map():
    map = coordinator.get_map_dict()
    return jsonify(map), 200

@app.route('/api/reset', methods=['GET'])
def reset():
    coordinator.reset()
    map = Map([])
    map = map.to_dict()
    return jsonify(map), 200

@app.route('/api/check_radius_explored', methods=['GET'])
def check_radius_explored():
    # Get coordinates and radius from query parameters
    coordinates_str = request.args.get('coordinates')  # e.g., "10.5,20.2"
    radius = request.args.get('radius', default=10, type=int)

    # Check if coordinates were provided
    if not coordinates_str:
        return jsonify({"error": "Missing 'coordinates' parameter"}), 400

    # Parse coordinates string into a list of floats (or integers)
    try:
        coordinates = [float(x) for x in coordinates_str.split(",")]
        if len(coordinates) != 2:
            raise ValueError("Coordinates must have exactly two values.")
    except ValueError:
        return jsonify({"error": "Invalid 'coordinates' format. Expected format: 'x,y' with numeric values."}), 400

    # Call the check_radius_explored method and return results
    updated_map = coordinator.check_radius_explored(coordinates, radius)
    return jsonify(updated_map), 200

if __name__ == '__main__':
    app.run(debug=True)
