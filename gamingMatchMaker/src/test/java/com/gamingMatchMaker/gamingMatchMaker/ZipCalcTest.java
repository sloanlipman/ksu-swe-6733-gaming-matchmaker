package com.gamingMatchMaker.gamingMatchMaker;

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
	}

	/**
	 * Test for the other zip code being invalid.
	 */
	@Test
	void test_GD_InvalidOther() {
		fail("Not yet implemented");
	}
	
	/**
	 * Tests for attempting to create a new zip code object with a bad value.
	 */
	@Test
	void test_ZC_Invalid() {
		
	}
}
