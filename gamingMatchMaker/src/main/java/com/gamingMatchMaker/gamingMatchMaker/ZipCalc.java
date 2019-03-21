package com.gamingMatchMaker.gamingMatchMaker;

import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
import org.springframework.stereotype.Component;

import com.gamingMatchMaker.gamingMatchMaker.model.Location;
import com.gamingMatchMaker.gamingMatchMaker.service.LocationService.*;
=======

import com.gamingMatchMaker.gamingMatchMaker.model.Location;
import com.gamingMatchMaker.gamingMatchMaker.service.LocationService.LocationService;
>>>>>>> Worked up Spring Framework classes for ZipCalc.
import com.grum.geocalc.*;

@Component
public class ZipCalc {
	private String zip;
	private com.grum.geocalc.Point pt;
	
<<<<<<< HEAD
	//this is here for unit testing- might be removed once matchmaking app is built
	@Autowired
	public LocationService service;
	
	/**
	 * Need to create a function which takes in a second zipcode and calculates the distance. 
<<<<<<< HEAD
	 * TODO Should we cache the result in the DB - which is quicker, the DB read or the local calc?
	 */

	/**
	 * 
	 * @param z
=======
	 * Should we cache the result in the DB - which is quicker, the DB read or the local calc?
>>>>>>> fixing PEBKAC moment
=======
	@Autowired
	private LocationService service;
	
	/**
	 * Need to create a function which takes in a second zipcode and calculates the distance. 
	 * TODO Should we cache the result in the DB - which is quicker, the DB read or the local calc?
>>>>>>> Worked up Spring Framework classes for ZipCalc.
	 */
	public ZipCalc() {
	}
	
	/**
	 * 
	 * @param z
	 */
	public ZipCalc(String code) {
		this.SetZip(code);
	}
	
	/**
	 * 
	 * @param zcode
	 */
	public void SetZip(String zcode) {
		this.zip = zcode;
		
		//read the information from the DB
<<<<<<< HEAD
		Location spot = service.GetLocation(zcode);
				
		Coordinate lat = Coordinate.fromDegrees(spot.getLat());
		Coordinate lng = Coordinate.fromDegrees(spot.getLng());
		
=======
		Location spot = service.GetLocation(code);
				
		Coordinate lat = Coordinate.fromDegrees(spot.getLat());
		Coordinate lng = Coordinate.fromDegrees(spot.getLng());
>>>>>>> Worked up Spring Framework classes for ZipCalc.
		pt = Point.at(lat, lng);
	}
	
	/**
	 * 
<<<<<<< HEAD
	 * @param start
	 * @param dest
	 * @throws UnsetStartingPointException Should never happen, but this is need for the method overloading so the signatures match.
	 * @return
	 */
	public double GetDistance(String start, String dest) throws UnsetStartingPointException {
		this.SetZip(start);
		return this.GetDistance(dest);
	}
	
	/**
	 * 
	 * @param dest
	 * @throws UnsetStartingPointException The SetZip() function has not yet been called.
	 * @throws BadZipException The destination zip code was not found
	 * @return
	 */
	public double GetDistance(String dest) throws UnsetStartingPointException, BadZipException {
=======
	 * @param zcode
	 * @return
	 */
	public double GetDistance(int zcode) {
>>>>>>> Worked up Spring Framework classes for ZipCalc.
		//first check the db for cached?
		if(this.zip == null || this.zip.length() == 0) throw new UnsetStartingPointException();
		
		//read the information for the second zip code from the DB
<<<<<<< HEAD
		Location spot = service.GetLocation(dest);
=======
		Location spot = service.GetLocation(zcode);
>>>>>>> Worked up Spring Framework classes for ZipCalc.
		
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
<<<<<<< HEAD
	public String GetStartingZipCode() {
=======
	public int GetStartingZipCode() {
>>>>>>> Worked up Spring Framework classes for ZipCalc.
		return this.zip;
	}
	
}
