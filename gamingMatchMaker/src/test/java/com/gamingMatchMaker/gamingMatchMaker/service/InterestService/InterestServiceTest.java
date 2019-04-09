package com.gamingMatchMaker.gamingMatchMaker.service.InterestService;

import org.junit.runner.RunWith;
import static org.junit.Assert.*;

import java.util.ArrayList;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@Transactional	//fix DB changes after the tests run
@SpringBootTest
public class InterestServiceTest {
	
	@Autowired
	private InterestService service;
	
	@Test
	public void test_GetAll() {
		ArrayList<String> ints = new ArrayList<String>();
		
		//actaully do the call
		ints.addAll(service.GetInterests());
		
		//TODO get side-band DB access in here and use that instead
		assertTrue(String.format("First interest %s is not 3D printin", ints.get(0)), ints.get(0).compareTo("3D printin") == 0);
		assertTrue(String.format("Second interest %s is not Board/tabletop game", ints.get(9)), ints.get(9).compareTo("Board/tabletop game") == 0);
		assertTrue(String.format("Third interest %s is not Photography", ints.get(66)), ints.get(66).compareTo("Photography") == 0);
		assertTrue(String.format("Fourth interest %s is not Yoga", ints.get(99)), ints.get(99).compareTo("Yoga") == 0);
	}

	@Test
	public void test_AddInt_Normal() {
		//the actual test
		try{
			service.AddInterest("New_Interest");
		}
		catch (InterestExistsException e) {
			fail(String.format("unexpected exception: %s", e.getMessage()));
		}
		
		//now the checking
		ArrayList<String> ints = new ArrayList<String>();
		
		//read the new list
		ints.addAll(service.GetInterests());
		
		//the last one should be New_Interest
		assertTrue(String.format("%s is not New_Interest", ints.get(99)), ints.get(ints.size() - 1).compareTo("New_Interest") == 0);
	}

	@Test
	public void test_AddInt_AlreadyExists() {
		//the actual test
		try{
			service.AddInterest("Yoga");
			fail("Did not get exception for adding existing interest");
		}
		catch (InterestExistsException e) {
			assertTrue(e.getInterest().compareTo("Yoga") == 0);
		}
		//fail- wrong exception
		catch (EmptyInterestException e) {
			fail("Got the empty interest, not the already exists.");
		}
	}

	@Test
	public void test_AddInt_Empty() {
		try{
			service.AddInterest("");
			fail("Did not get exception for adding an empty interest");
		}
		//fail- wrong exception
		catch (InterestExistsException e) {
			fail("Got the already exists exception, not the empty interest.");
		}
		//just pass
		catch (EmptyInterestException e) { }
	}

}
