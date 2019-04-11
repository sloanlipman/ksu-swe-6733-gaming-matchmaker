package com.gamingMatchMaker.gamingMatchMaker.service.ProfileService;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.HashSet;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.gamingMatchMaker.gamingMatchMaker.controller.SaveChangesAttempt;
import com.gamingMatchMaker.gamingMatchMaker.controller.authorization.UserDetail;
import com.gamingMatchMaker.gamingMatchMaker.model.Interest;
import com.gamingMatchMaker.gamingMatchMaker.model.Location;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserException;

@RunWith(SpringRunner.class)
@Transactional	//fix DB changes after the tests run
@SpringBootTest
public class ProfileServiceTest {

	@Autowired
	private ProfileService service;
	
	//TODO add a sideband DB access for reading expected values
	
	@Test
	public void test_GetProfile_Admin() {
		UserRec rec = null;
		try{
			//get the record
			rec = service.GetUserProfile(74);	
		}
		catch (Exception e) {
			fail("Unexpected error: " + e.getMessage());
		}

		//haven't failed yet! - check the easy fields
		assertEquals(
				String.format("Age %d did not match expected value (99)",rec.getAge()),
				rec.getAge(), 
				99
		);
		assertEquals(
				String.format("Email %s did not match expected value (admin@aaa.com)",rec.getEmail()),
				rec.getEmail(), 
				"admin@aaa.com"
		);
		assertEquals(
				String.format("First Name %s did not match expected value (admin)",rec.getFirst_name()),
				rec.getFirst_name(), 
				"admin"
		);
		assertEquals(
				String.format("Last Name %s did not match expected value (admin)",rec.getLast_name()),
				rec.getLast_name(), 
				"admin"
		);
		//only checking one field to make sure we got the correct one
		assertEquals(
				String.format("Zip Code %s did not match expected value (30047)",rec.getLocation().getZip()),
				rec.getLocation().getZip(), 
				"30047"
		);
		//check we have the correct number of interests - admin's aren't very interesting people
		assertEquals(
				String.format("Interest Count %d did not match expected value (0)",rec.getInterests().size()),
				rec.getInterests().size(), 
				0
		);
	} //end test_GetProfile_Admin()
	
	@Test
	public void test_GetProfile_User() {
		UserRec rec = null;
		try{
			//get the record
			rec = service.GetUserProfile(75);	
		}
		catch (Exception e) {
			fail("Unexpected error: " + e.getMessage());
		}

		//haven't failed yet! - check the easy fields
		assertEquals(
				String.format("Age %d did not match expected value (37)",rec.getAge()),
				rec.getAge(), 
				37
		);
		assertEquals(
				String.format("Email %s did not match expected value (testJon2@test.com)",rec.getEmail()),
				rec.getEmail(), 
				"testJon2@test.com"
		);
		assertEquals(
				String.format("First Name %s did not match expected value (Jon)",rec.getFirst_name()),
				rec.getFirst_name(), 
				"Jon"
		);
		assertEquals(
				String.format("Last Name %s did not match expected value (Doe)",rec.getLast_name()),
				rec.getLast_name(), 
				"Doe"
		);
		//only checking one field to make sure we got the correct one
		assertEquals(
				String.format("Zip Code %s did not match expected value (30047)",rec.getLocation().getZip()),
				rec.getLocation().getZip(), 
				"30047"
		);
		/*
			Board/tabletop game
			Candle making[8]
			Yoga
			Knife making
		 */
		//check we have the correct number of interests
		assertEquals(
				String.format("Interest Count %d did not match expected value (4)",rec.getInterests().size()),
				rec.getInterests().size(), 
				4
		);
		
		//ok, now we do something weird - since the order is non-deterministic we need to process this another way
		HashSet<String> ints = new HashSet<String>();
		ints.add("Board/tabletop game");
		ints.add("Candle making[8]");
		ints.add("Yoga");
		ints.add("Knife making");
		
		//remove the all the interests from this set
		for(Interest I : rec.getInterests()) {
			if(ints.contains(I.getActivity())) {
				ints.remove(I.getActivity());
			}
			else {
				//ummm, how did we get this?
				fail(String.format("Unexpected interest %s", I.getActivity()));
			}
		}
		
		//if we found all the interests, the ints is empty
		assertEquals(String.format("Interests List had %d leftover.", ints.size()), ints.size(), 0);
	} //end test_GetProfile_User()
	
	@Test
	public void test_GetProfile_idDNE() {
		try{
			//get the record
			UserRec rec = service.GetUserProfile(1);
			fail("Did not get the User Exception for id= 1");
		}
		//catch and skip the exception to pass 
		catch (UserException ue) {}
	}

	@Test
	public void test_SaveProfile() {
		ArrayList<String> ints  = new ArrayList<>();
		ints.add("Board/tabletop game");
		ints.add("Do it yourself");
		ints.add("Homebrewing");
		ints.add("Lego building");
		ints.add("Woodworking");
		
		Location place = new Location("30040", "CUMMING", "GA", 34.20f, -84.13f, "NA-US-GA-CUMMING");

		//create the user detail
		UserDetail ud = new UserDetail(76, "mm@test.com", "moffett", "mckenna", 42, true, 1, place, ints);
		SaveChangesAttempt sca = new SaveChangesAttempt(ud);
		
		//attempt the save operation
		assertTrue(String.format("Save Profile failed for reason %s", sca.getMessage()), service.SaveProfile(sca));
		//verify the error message is still empty
		assertTrue(String.format("Save Change Attempt had unexpected error message %s", sca.getMessage()), sca.getMessage().length() == 0);
		
		//now we duplicate the get profile test to make sure the update occured - refactor?
		UserRec rec = null;
		try{
			//get the record
			rec = service.GetUserProfile(76);	
		}
		catch (Exception e) {
			fail("Unexpected error: " + e.getMessage());
		}

		//haven't failed yet! - check the easy fields
		assertEquals(
				String.format("Age %d did not match expected value (42)",rec.getAge()),
				rec.getAge(), 
				42
		);
		assertEquals(
				String.format("Email %s did not match expected value (mm@test.com)",rec.getEmail()),
				rec.getEmail(), 
				"mm@test.com"
		);
		assertEquals(
				String.format("First Name %s did not match expected value (moffett)",rec.getFirst_name()),
				rec.getFirst_name(), 
				"moffett"
		);
		assertEquals(
				String.format("Last Name %s did not match expected value (mckenna)",rec.getLast_name()),
				rec.getLast_name(), 
				"mckenna"
		);
		//only checking one field to make sure we got the correct one
		assertEquals(
				String.format("Zip Code %s did not match expected value (30040)",rec.getLocation().getZip()),
				rec.getLocation().getZip(), 
				"30040"
		);
		//check we have the correct number of interests
		assertEquals(
				String.format("Interest Count %d did not match expected value (%d)",rec.getInterests().size(), ints.size()),
				rec.getInterests().size(), 
				ints.size()
		);
		
		
		//remove the all the interests from this set
		for(Interest I : rec.getInterests()) {
			if(ints.contains(I.getActivity())) {
				ints.remove(I.getActivity());
			}
			else {
				//ummm, how did we get this?
				fail(String.format("Unexpected interest %s", I.getActivity()));
			}
		}
		
		//if we found all the interests, the ints is empty
		assertEquals(String.format("Interests List had %d leftover.", ints.size()), ints.size(), 0);
	}

	@Test
	public void test_SaveProfile_idDNE() {
		float f = 0.0f;
		//create the bad user detail
		UserDetail ud = new UserDetail(1, "please@delete.me", "moffett", "mckenna", 1, true, 1, new Location("30040", "", "", f, f, ""));
		SaveChangesAttempt sca = new SaveChangesAttempt(ud);
		
		//attempt the save operation
		assertFalse("Save Profile succeeded even with a bad user id (1)", service.SaveProfile(sca));
		//verify we got the correct error message
		assertTrue(String.format("Save Change Attempt had unexpected error message %s", sca.getMessage()), sca.getMessage().compareTo("User does not exist.  Please Register first.") == 0);
	}

	/* Test cannot be run since it trie
	 */
	@Test
	public void test_SaveProfile_locationDNE() {
		//11111 does not exist

		Location place = new Location("11111", "Does Not", "Exist", 34f, -84f, "Imaginary Place");
		
		//create the bad user detail
		UserDetail ud = new UserDetail(76, "please@delete.me", "moffett", "mckenna", 1, true, 1, place);
		SaveChangesAttempt sca = new SaveChangesAttempt(ud);
		
		//attempt the save operation
		assertFalse("Save Profile succeeded even with a bad location (11111)", service.SaveProfile(sca));
		//verify we got the correct error message
		assertTrue(String.format("Save Change Attempt had unexpected error message %s", sca.getMessage()), sca.getMessage().compareTo("Zipcode does not exist.") == 0);
		
		//verify no update occured
		UserRec rec = null;
		try{
			//get the record
			rec = service.GetUserProfile(76);	
		}
		catch (Exception e) {
			fail("Unexpected error: " + e.getMessage());
		}
		assertEquals(
				String.format("Email %s did not match expected value (testJon@test.com)",rec.getEmail()),
				rec.getEmail(), 
				"testJon@test.com"
		);
		assertEquals(
				String.format("First Name %s did not match expected value (Jon)",rec.getFirst_name()),
				rec.getFirst_name(), 
				"Jon"
		);
		assertEquals(
				String.format("Last Name %s did not match expected value (Doe)",rec.getLast_name()),
				rec.getLast_name(), 
				"Doe"
		);
	}

	@Test
	public void test_SaveProfile_NewInterest() {
		// the only difference between this and the normal case is the addition of an interest not in the db
		
		ArrayList<String> ints  = new ArrayList<>();
		ints.add("Board/tabletop game");
		ints.add("Do it yourself");
		ints.add("Homebrewing");
		ints.add("Lego building");
		ints.add("Woodworking");
		ints.add("Hacking");	//THE ONLY DIFFERENCE!!!!!
		
		Location place = new Location("30040", "CUMMING", "GA", 34.20f, -84.13f, "NA-US-GA-CUMMING");

		//create the user detail
		UserDetail ud = new UserDetail(76, "mm@test.com", "moffett", "mckenna", 42, true, 1, place, ints);
		SaveChangesAttempt sca = new SaveChangesAttempt(ud);
		
		//attempt the save operation
		assertTrue(String.format("Save Profile failed for reason %s", sca.getMessage()), service.SaveProfile(sca));
		//verify the error message is still empty
		assertTrue(String.format("Save Change Attempt had unexpected error message %s", sca.getMessage()), sca.getMessage().length() == 0);
		
		//now we duplicate the get profile test to make sure the update occured - refactor?
		UserRec rec = null;
		try{
			//get the record
			rec = service.GetUserProfile(76);	
		}
		catch (Exception e) {
			fail("Unexpected error: " + e.getMessage());
		}

		//haven't failed yet! - check the easy fields
		assertEquals(
				String.format("Age %d did not match expected value (42)",rec.getAge()),
				rec.getAge(), 
				42
		);
		assertEquals(
				String.format("Email %s did not match expected value (mm@test.com)",rec.getEmail()),
				rec.getEmail(), 
				"mm@test.com"
		);
		assertEquals(
				String.format("First Name %s did not match expected value (moffett)",rec.getFirst_name()),
				rec.getFirst_name(), 
				"moffett"
		);
		assertEquals(
				String.format("Last Name %s did not match expected value (mckenna)",rec.getLast_name()),
				rec.getLast_name(), 
				"mckenna"
		);
		//only checking one field to make sure we got the correct one
		assertEquals(
				String.format("Zip Code %s did not match expected value (30040)",rec.getLocation().getZip()),
				rec.getLocation().getZip(), 
				"30040"
		);
		//check we have the correct number of interests
		assertEquals(
				String.format("Interest Count %d did not match expected value (%d)",rec.getInterests().size(), ints.size()),
				rec.getInterests().size(), 
				ints.size()
		);
		
		//remove the all the interests from this set
		for(Interest I : rec.getInterests()) {
			if(ints.contains(I.getActivity())) {
				ints.remove(I.getActivity());
			}
			else {
				//ummm, how did we get this?
				fail(String.format("Unexpected interest %s", I.getActivity()));
			}
		}
		
		//if we found all the interests, the ints is empty
		assertEquals(String.format("Interests List had %d leftover.", ints.size()), ints.size(), 0);	
	}

}
