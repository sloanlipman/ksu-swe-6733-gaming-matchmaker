package com.gamingMatchMaker.gamingMatchMaker.service.LocationService;

public class BadZipException extends IllegalArgumentException {

	public BadZipException() {
		super();
	}
	
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	public BadZipException(String z) {
		super("Zipcode " + z + " is not in the database.");
=======
	public BadZipException(int z) {
		super("Zipcode " + " is not in the database.");
>>>>>>> Worked up Spring Framework classes for ZipCalc.
=======
	public BadZipException(int z) {
		super("Zipcode " + " is not in the database.");
>>>>>>> Worked up Spring Framework classes for ZipCalc.
=======
	public BadZipException(String z) {
		super("Zipcode " + z + " is not in the database.");
>>>>>>> ZipCalc completed and ready to go.
	}

	public BadZipException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> Worked up Spring Framework classes for ZipCalc.
	public BadZipException(String arg0) {
		super(arg0);
	}

<<<<<<< HEAD
>>>>>>> Worked up Spring Framework classes for ZipCalc.
=======
>>>>>>> Worked up Spring Framework classes for ZipCalc.
=======
>>>>>>> ZipCalc completed and ready to go.
	public BadZipException(Throwable arg0) {
		super(arg0);
	}

}
