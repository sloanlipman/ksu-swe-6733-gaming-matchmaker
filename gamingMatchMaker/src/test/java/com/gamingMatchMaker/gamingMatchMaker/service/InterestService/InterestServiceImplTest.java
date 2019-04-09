package com.gamingMatchMaker.gamingMatchMaker.service.InterestService;

import org.junit.runner.RunWith;
import static org.junit.Assert.*;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@Transactional	//fix DB changes after the tests run
@SpringBootTest
public class InterestServiceImplTest {
	
	@Autowired
	private InterestServiceImpl impl;
	
	@Test
	public void test_GetAll() {
		fail("Not Yet Implemented");
	}

	@Test
	public void test_AddInt_Normal() {
		fail("Not Yet Implemented");
	}
	

	@Test
	public void test_AddInt_AlreadyExists() {
		fail("Not Yet Implemented");
	}

	@Test
	public void test_AddInt_Empty() {
		fail("Not Yet Implemented");
	}

}
