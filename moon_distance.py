import math
import sys
from datetime import datetime, date

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

def calculate_moon_cycle(target_date=None):
    """
    Calculate the moon phase for a given date.
    
    Args:
    target_date (datetime.date, optional): Date to calculate moon phase for. 
                                           Defaults to current date.
    
    Returns:
    dict: Moon phase information including percentage and description
    """
    if target_date is None:
        target_date = date.today()
    
    # Reference new moon date (January 6, 2000)
    reference_new_moon = date(2000, 1, 6)
    
    # Synodic month length (average lunar month)
    synodic_month = 29.53  # days
    
    # Calculate days since reference new moon
    days_since_reference = (target_date - reference_new_moon).days
    
    # Calculate current moon phase
    moon_phase = (days_since_reference % synodic_month) / synodic_month * 100
    
    # Determine moon phase description
    if moon_phase < 6.38:
        phase_description = "New Moon"
    elif moon_phase < 44.62:
        phase_description = "Waxing Crescent"
    elif moon_phase < 56.38:
        phase_description = "First Quarter"
    elif moon_phase < 93.62:
        phase_description = "Waxing Gibbous"
    elif moon_phase < 106.38:
        phase_description = "Full Moon"
    elif moon_phase < 143.62:
        phase_description = "Waning Gibbous"
    elif moon_phase < 156.38:
        phase_description = "Last Quarter"
    else:
        phase_description = "Waning Crescent"
    
    return {
        "date": target_date,
        "phase_percentage": round(moon_phase, 2),
        "phase_description": phase_description
    }

def main():
    """
    Main function to display the moon's distance and current moon cycle
    Optionally accepts a date as a command-line argument (YYYY-MM-DD)
    """
    distance = calculate_moon_distance()
    
    # Check for command-line date argument
    target_date = None
    if len(sys.argv) > 1:
        try:
            target_date = datetime.strptime(sys.argv[1], '%Y-%m-%d').date()
        except ValueError:
            print(f"Error: Invalid date format. Please use YYYY-MM-DD. Received: {sys.argv[1]}")
            sys.exit(1)
    
    moon_cycle = calculate_moon_cycle(target_date)
    
    print("Distance to the Moon:")
    print(f"  {distance['kilometers']:,} kilometers")
    print(f"  {distance['miles']:,} miles")
    
    print("\nMoon Cycle Information:")
    print(f"  Date: {moon_cycle['date']}")
    print(f"  Phase: {moon_cycle['phase_description']}")
    print(f"  Phase Percentage: {moon_cycle['phase_percentage']}%")

if __name__ == "__main__":
    main()
