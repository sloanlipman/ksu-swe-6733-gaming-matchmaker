package com.gamingMatchMaker.gamingMatchMaker.service.LocationService;

public class BadZipException extends IllegalArgumentException {

	public BadZipException() {
		super();
	}
	
	public BadZipException(int z) {
		super("Zipcode " + " is not in the database.");
	}

	public BadZipException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	public BadZipException(String arg0) {
		super(arg0);
	}

	public BadZipException(Throwable arg0) {
		super(arg0);
	}

}
