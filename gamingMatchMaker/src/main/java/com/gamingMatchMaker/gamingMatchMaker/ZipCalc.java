package com.gamingMatchMaker.gamingMatchMaker;

import org.springframework.beans.factory.annotation.Autowired;

import com.gamingMatchMaker.gamingMatchMaker.model.Location;
import com.gamingMatchMaker.gamingMatchMaker.service.LocationService.LocationService;
import com.grum.geocalc.*;

public class ZipCalc {
	private int zip;
	private com.grum.geocalc.Point pt;
	
	@Autowired
	private LocationService service;
	
	/**
	 * Need to create a function which takes in a second zipcode and calculates the distance. 
	 * TODO Should we cache the result in the DB - which is quicker, the DB read or the local calc?
	 */
	
	/**
	 * 
	 * @param z
	 */
	public ZipCalc(int code) {
		this.zip = code;
		
		//read the information from the DB
		Location spot = service.GetLocation(code);
				
		Coordinate lat = Coordinate.fromDegrees(spot.getLat());
		Coordinate lng = Coordinate.fromDegrees(spot.getLng());
		pt = Point.at(lat, lng);
	}
	
	/**
	 * 
	 * @param zcode
	 * @return
	 */
	public double GetDistance(int zcode) {
		//first check the db for cached?
		
		//read the information for the second zip code from the DB
		Location spot = service.GetLocation(zcode);
		
		//convert to a point
		Coordinate lat = Coordinate.fromDegrees(spot.getLat());
		Coordinate lng = Coordinate.fromDegrees(spot.getLng());
		Point other = Point.at(lat, lng);
	
		//calc the distance
		double distance = EarthCalc.vincentyDistance(pt, other); //in meters
		
		//TODO convert to miles?
		
		return distance;
	}
	
	//these are really meant for the unit tests, not actual use
	public double GetStartingLat() {
		return pt.latitude;
	}
	public double GetStartingLong() {
		return pt.longitude;
	}
	public int GetStartingZipCode() {
		return this.zip;
	}
	
}
