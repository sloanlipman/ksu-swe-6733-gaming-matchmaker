package com.gamingMatchMaker.gamingMatchMaker;

<<<<<<< HEAD

import org.junit.*;
<<<<<<< HEAD
<<<<<<< HEAD
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.*;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import com.gamingMatchMaker.gamingMatchMaker.service.LocationService.BadZipException;
import com.gamingMatchMaker.gamingMatchMaker.service.LocationService.UnsetStartingPointException;

@RunWith(SpringRunner.class)
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
@SpringBootTest
public class ZipCalcTest {
	/* http://www.gpsvisualizer.com/calculators
	 * 							30318	30040	30052	30084
	 * 30318	33.78	-84.44	-----	54688	51228	21798
	 * 30040	34.20	-84.13	54688	-----	46646	39703
	 * 30052	33.83	-83.89	51228	46646	-----	30624
	 * 30084	33.85	-84.22	21798	39703	30624	-----
	*/
	
	private static double DELTA = 0.5;

	@Autowired
	ZipCalc zc;	
	
	/**
	 * Verify normal creation of good zip codes.
	 */
	@Test
	public void test_ZC_SetZip() {
		//multiple cases for parameter verification
		zc.SetZip("30318");
		assertEquals(33.78, zc.GetStartingLat(), DELTA);
		assertEquals(-84.44, zc.GetStartingLong(), DELTA);
		
		zc.SetZip("30040");
		assertEquals(34.20, zc.GetStartingLat(), DELTA);
		assertEquals(-84.13, zc.GetStartingLong(), DELTA);
		
		
		zc.SetZip("30052");
		assertEquals(33.83, zc.GetStartingLat(), DELTA);
		assertEquals(-83.89, zc.GetStartingLong(), DELTA);
		
		
		zc.SetZip("30084");
		assertEquals(33.85, zc.GetStartingLat(), DELTA);
		assertEquals(-84.22, zc.GetStartingLong(), DELTA);
	}

	/**
	 * Tests the distance calculation when the two zip codes are valid and set is used first.  
	 */
	@Test
	public void test_GD_Normal() {
		//multiple cases for calculation verfication - the vectors are almost N,S,E,W

		zc.SetZip("30318");
		try {
			assertEquals(54688, zc.GetDistance("30040"), DELTA);
		} 
		catch (UnsetStartingPointException e) {
			fail("Unexpected exception(UnsetStartingPointException): " + e.getMessage());
		}
		try {
			assertEquals(51229, zc.GetDistance("30052"), DELTA);
		} 
		catch (UnsetStartingPointException e) {
			fail("Unexpected exception(UnsetStartingPointException): " + e.getMessage());
		}
		try {
			assertEquals(21798, zc.GetDistance("30084"), DELTA);
		} 
		catch (UnsetStartingPointException e) {
			fail("Unexpected exception(UnsetStartingPointException): " + e.getMessage());
		}
		
		//change zip codes
		zc.SetZip("30052");
		try {
			assertEquals(30625, zc.GetDistance("30084"), DELTA);
		} 
		catch (UnsetStartingPointException e) {
			fail("Unexpected exception(UnsetStartingPointException): " + e.getMessage());
		}
	}
	
<<<<<<< HEAD
=======
=======
import org.junit.Assert.*;
=======
>>>>>>> Getting rebase results repaired
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ZipCalcTest {

>>>>>>> Working on the Unit Tests.  Focus is on ZipCalcTests, but Chimney
	/**
	 * Verify normal creation of good zip codes.
	 */
	@Test
	public void test_ZC_Valid() {
		/*
		 * 30318	33.78	-84.44
		 * 30040	34.20	-84.13
		 * 30052	33.83	-83.89
		 * 30084	33.85	-84.22
		*/
		
		ZipCalc zc1 = new ZipCalc(30318);
		Assert.assertEquals(33.78, zc1.GetStartingLat(), 0);
		Assert.assertEquals(-84.44, zc1.GetStartingLong(), 0);
		
		ZipCalc zc2 = new ZipCalc(30040);
		Assert.assertEquals(34.20, zc2.GetStartingLat(), 0);
		Assert.assertEquals(-84.13, zc2.GetStartingLong(), 0);
		
		
		ZipCalc zc3 = new ZipCalc(30052);
		Assert.assertEquals(33.78, zc3.GetStartingLat(), 0);
		Assert.assertEquals(-83.89, zc3.GetStartingLong(), 0);
		
		
		ZipCalc zc4 = new ZipCalc(30084);
		Assert.assertEquals(33.78, zc4.GetStartingLat(), 0);
		Assert.assertEquals(-84.22, zc4.GetStartingLong(), 0);
	}
>>>>>>> Worked up Spring Framework classes for ZipCalc.

	/**
<<<<<<< HEAD
	 * Verify the distance is calculated when the set is done via GetDistance.
	 */
	@Test
	public void test_GD_SetandGet() {		
		//multiple to make sure back to back calls work
		try {
			assertEquals(54688, zc.GetDistance("30318", "30040"), DELTA);
			assertEquals(33.78, zc.GetStartingLat(), DELTA);
			assertEquals(-84.44, zc.GetStartingLong(), DELTA);
		} 
		catch (UnsetStartingPointException e) {
			fail("Unexpected exception(UnsetStartingPointException): " + e.getMessage());
		}		
		try {
			//the first param here is not needed
			assertEquals(51229, zc.GetDistance("30318", "30052"), DELTA);
		} 
		catch (UnsetStartingPointException e) {
			fail("Unexpected exception(UnsetStartingPointException): " + e.getMessage());
		}		

		//change zip codes
		try {
			assertEquals(30625, zc.GetDistance("30052", "30084"), DELTA);
			assertEquals(33.83, zc.GetStartingLat(), DELTA);
			assertEquals(-83.89, zc.GetStartingLong(), DELTA);
		} catch (UnsetStartingPointException e) {
			fail("Unexpected exception(UnsetStartingPointException): " + e.getMessage());
		}
		
=======
	 * Tests the distance calculation when the two zip codes are valid.  
	 */
	@Test
	public void test_GD_Normal() {
		//TODO implement the real test
		Assert.assertTrue(true);
>>>>>>> Working on the Unit Tests.  Focus is on ZipCalcTests, but Chimney
=======
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ZipCalcTest {

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@AfterEach
	void tearDown() throws Exception {
	}
	
	/**
	 * Verify normal creation of good zip codes.
	 */
	@Test
	void test_ZC_Valid() {
		/*
		 * 30318	33.78	-84.44
		 * 30040	34.20	-84.13
		 * 30052	33.83	-83.89
		 * 30084	33.85	-84.22
		*/
		
		
	}

	/**
	 * Tests when the two zip codes are valid.  
	 */
	@Test
	void test_GD_Normal() {
		fail("Not yet implemented");
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
	}

	/**
	 * Test for the other zip code being invalid.
	 */
	@Test
<<<<<<< HEAD
	public void test_GD_InvalidOther() {
<<<<<<< HEAD
		//TODO should really split this one up
		zc.SetZip("30318");
		
		//letters case
		try {
			zc.GetDistance("ABCD");
			fail("GetDistance() did not error on destination ABCD.");
		}
		catch (UnsetStartingPointException e) {
			fail("Unexpected exception(UnsetStartingPointException): " + e.getMessage());
		}
		//this is the passing case
		catch (BadZipException e) {}
		
		//short zip case
		try {
			assertEquals(54688, zc.GetDistance("1234"), DELTA);
			fail("GetDistance() did not error on destination 1234.");
		}
		catch (UnsetStartingPointException e) {
			fail("Unexpected exception(UnsetStartingPointException): " + e.getMessage());
		}
		//this is the passing case
		catch (BadZipException e) {}
=======
		//TODO implement the real test
		Assert.assertTrue(true);
>>>>>>> Working on the Unit Tests.  Focus is on ZipCalcTests, but Chimney
	}

	/**
	 * Verify the GetDistance function throws an exception when the starting point is not provided.
	 */
	@Test
<<<<<<< HEAD
	public void test_GD_NoStart() {
	
		//invalid - not SetZip and only 1 param 
		try {
			zc.GetDistance("30052");
			fail("GetDistance() did not error when the starting point was not set.");
		}
		catch (BadZipException e) {
			fail("Unexpected exception(BadZipException): " + e.getMessage());
		}
		//this is the passing case
		catch (UnsetStartingPointException e) {	}
=======
	public void test_ZC_Invalid() {
		//TODO implement the real test
		Assert.assertTrue(true);
>>>>>>> Working on the Unit Tests.  Focus is on ZipCalcTests, but Chimney
		
	}
	
=======
	void test_GD_InvalidOther() {
		fail("Not yet implemented");
	}
	
	/**
	 * Tests for attempting to create a new zip code object with a bad value.
	 */
	@Test
	void test_ZC_Invalid() {
		
	}
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
}
