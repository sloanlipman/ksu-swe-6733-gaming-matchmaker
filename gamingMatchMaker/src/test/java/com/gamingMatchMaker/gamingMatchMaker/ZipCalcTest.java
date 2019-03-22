package com.gamingMatchMaker.gamingMatchMaker;


import org.junit.*;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ZipCalcTest {

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

	/**
	 * Tests the distance calculation when the two zip codes are valid.  
	 */
	@Test
	public void test_GD_Normal() {
		//TODO implement the real test
		Assert.assertTrue(true);
	}

	/**
	 * Test for the other zip code being invalid.
	 */
	@Test
	public void test_GD_InvalidOther() {
		//TODO implement the real test
		Assert.assertTrue(true);
	}
	
	/**
	 * Tests for attempting to create a new zip code object with a bad value.
	 */
	@Test
	public void test_ZC_Invalid() {
		//TODO implement the real test
		Assert.assertTrue(true);
		
	}
}
