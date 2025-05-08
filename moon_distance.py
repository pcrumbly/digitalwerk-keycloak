import math

def calculate_moon_distance():
    """
    Calculate the average distance from Earth to the Moon.
    
    Returns:
    float: Distance to the moon in kilometers and miles
    """
    # Average distance to the moon (in kilometers)
    moon_distance_km = 384_400  # kilometers
    moon_distance_miles = moon_distance_km * 0.621371  # convert to miles
    
    return {
        "kilometers": moon_distance_km,
        "miles": round(moon_distance_miles, 2)
    }

def main():
    """
    Main function to display the moon's distance
    """
    distance = calculate_moon_distance()
    print("Distance to the Moon:")
    print(f"  {distance['kilometers']:,} kilometers")
    print(f"  {distance['miles']:,} miles")

if __name__ == "__main__":
    main()
