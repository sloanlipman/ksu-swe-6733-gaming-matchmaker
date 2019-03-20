package com.gamingMatchMaker.gamingMatchMaker;

import com.grum.geocalc.*;

public class ZipCalc {
	private int zip;
	private com.grum.geocalc.Point pt;
	
	/**
	 * Need to create a function which takes in a second zipcode and calculates the distance. 
	 * Should we cache the result in the DB - which is quicker, the DB read or the local calc?
	 */
	
	/**
	 * 
	 * @param z
	 */
	public ZipCalc(int code) {
		this.zip = code;
		
		//read the information from the DB
		
		Coordinate lat = Coordinate.fromDegrees(0);
		Coordinate lng = Coordinate.fromDegrees(0);
		pt = Point.at(lat, lng);
	}
	
	public double GetDistance(int zcode) {
		//first check the db for cached?
		
		//read the information for the second zip code from the DB
		
		
		Coordinate lat = Coordinate.fromDegrees(0);
		Coordinate lng = Coordinate.fromDegrees(0);
		com.grum.geocalc.Point other = Point.at(lat, lng);
	
		double distance = EarthCalc.vincentyDistance(pt, other); //in meters
		
		return distance;
	}
}
