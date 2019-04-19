package com.gamingMatchMaker.gamingMatchMaker.service.MatchingService;

import java.util.ArrayList;
import java.math.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.gamingMatchMaker.gamingMatchMaker.model.Location;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import com.gamingMatchMaker.gamingMatchMaker.service.LocationService.*;
import com.grum.geocalc.*;

@Component
public class ZipCalc implements IMatcher {
	private String zip;
	private com.grum.geocalc.Point pt;
	
	private static final int RADIUS = 1005840;  //about 25 miles in meters
	private static final double STEP = 16093.44; //about 10 miles
	private static final int MAX_STEPS = 10;  //in the scoring function only allow a max of 100 miles

	//this is here for unit testing- might be removed once matchmaking app is built
	@Autowired
	public LocationService service;

	/**
	 * Need to create a function which takes in a second zipcode and calculates the distance.
	 */

	/**
	 *
	 * @param z
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
		Location spot = service.GetLocation(zcode);

		Coordinate lat = Coordinate.fromDegrees(spot.getLat());
		Coordinate lng = Coordinate.fromDegrees(spot.getLng());

		pt = Point.at(lat, lng);
	}

	/**
	 *
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
		//first check the db for cached?
		if(this.zip == null || this.zip.length() == 0) throw new UnsetStartingPointException();

		//read the information for the second zip code from the DB
		Location spot = service.GetLocation(dest);

		//convert to a point
		Coordinate lat = Coordinate.fromDegrees(spot.getLat());
		Coordinate lng = Coordinate.fromDegrees(spot.getLng());
		Point other = Point.at(lat, lng);

		//calc the distance
		double distance = EarthCalc.vincentyDistance(pt, other); //in meters

		return distance;
	}

	//these are really meant for the unit tests, not actual use
	public double GetStartingLat() {
		return pt.latitude;
	}
	public double GetStartingLong() {
		return pt.longitude;
	}
	public String GetStartingZipCode() {
		return this.zip;
	}

	@Override
	/**
	 * Finds all the players within approximately 25 miles.
	 * @param self The user doing the search.
	 * @param recs The list of other users to look over.
	 */
	public ArrayList<UserRec> findMatches(UserRec self, ArrayList<UserRec> recs) {
		ArrayList<UserRec> others = new ArrayList<>();
		
		//set the starting point
		this.SetZip(self.getLocation().getZip());
		
		//check each user for a distance less than the radius
		for(UserRec u : recs) {
			try {
				if(this.GetDistance(u.getLocation().getZip()) < RADIUS) others.add(u);
			}
			catch(UnsetStartingPointException uspe) {
				//TODO what to with this?  log it?  still want to process the others
			}
			catch(BadZipException bze) {
				//TODO what to with this?  log it?  still want to process the others
			}
		}
		
		//return the list
		return others;
	}

	@Override
	public int scoreUser(UserRec self, UserRec other) {
		//set the starting point
		this.SetZip(self.getLocation().getZip());
		
		double dist = 0.0;
		
		try {
			//get teh distance
			dist = this.GetDistance(other.getLocation().getZip());
		}
		catch(Exception e) {
			//on error just give no points
			return 0;
		}

		//cheesy conversion - probably a better way
		Double dub = Math.ceil(dist/STEP);
		Integer a = new Integer(dub.toString());
		
		//use subtraction operation for ascending to descending inversion
		return (MAX_STEPS - a.intValue());
	}

}