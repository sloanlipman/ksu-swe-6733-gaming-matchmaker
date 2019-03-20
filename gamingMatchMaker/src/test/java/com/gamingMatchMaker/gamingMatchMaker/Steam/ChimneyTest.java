package com.gamingMatchMaker.gamingMatchMaker.Steam;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ChimneyTest {
	private static final String DEFAULT_STEAMID = "76561197995016920";
	private static final int DEFAULT_GAMEID = 440;

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

/*******************************************************\
 *                     GetAchLevel                     *
\*******************************************************/	
	
	/**
	 * Tests the GetAchLevel when both the user and the game exists.
	 */
	@Test
	void test_GAL_UserGame() {
		Chimney vent = new Chimney();
		try {
			assertTrue(vent.GetAchLevel(DEFAULT_STEAMID, DEFAULT_GAMEID) > 0);
		}
		catch (InvalidPlayerrException iue) {
			System.out.println(iue.getMessage());
		}
		catch (InvalidGameException ige) {
			System.out.println(ige.getMessage());
		}
	}
	
	/**
	 * Tests the GetAchLevel when the game does not exist.
	 */
	@Test
	void test_GAL_User() {
		Chimney vent = new Chimney();
		assertThrows(
				InvalidGameException.class, 
				() -> vent.GetAchLevel(DEFAULT_STEAMID, 0)
		);
	}
	
	/**
	 * Tests the GetAchLevel when the user id does not exist.
	 */
	@Test
	void test_GAL_Game() {
		Chimney vent = new Chimney();
		assertThrows(
			InvalidPlayerrException.class, 
			() -> vent.GetAchLevel(DEFAULT_STEAMID.substring(1), DEFAULT_GAMEID)
		);
	}

	/**
	 * Tests the GetAchLevel when the user id and game id are invalid.
	 */
	@Test
	void test_GAL_NONE() {
		Chimney vent = new Chimney();
		assertThrows(
			InvalidPlayerrException.class, 
			() -> vent.GetAchLevel(DEFAULT_STEAMID.substring(1), 0)
		);
	}

/*******************************************************\
 *                     LoadPlayer                      *
\*******************************************************/	

	/**
	 * Tests the normal actions taken to link a steam account to the user
	 */
	@Test
	void test_LP_Normal() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		try {
			vent.LoadPlayer(DEFAULT_STEAMID);
		}
		catch (InvalidPlayerrException ipe) {
			System.out.println(ipe.getMessage());
		}
		//TODO verify the player info is now in the DB (user -> steam id mapping, user -> game id mapping &ach cnt, steam games added)
	}
	
	/**
	 * Tests creating the user -> steam account link when some of the games are already in the DB.
	 */
	@Test
	void test_LP_PartialGames() {
		//TODO clear Player from DB (test DB)
		//TODO clear some games from the DB and ensure others are there
		Chimney vent = new Chimney();
		try {
			vent.LoadPlayer(DEFAULT_STEAMID);
		}
		catch (InvalidPlayerrException ipe) {
			System.out.println(ipe.getMessage());
		}
		//TODO verify the player info is now in the DB (user -> steam id mapping, user -> game id mapping &ach cnt, some steam games added)
	}
	
	/**
	 * Verify handling the error when the user id is truncated.
	 */
	@Test
	void test_LP_ShortUID() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		assertThrows(
				InvalidGameException.class, 
				() -> vent.LoadPlayer(DEFAULT_STEAMID.substring(1))
		);
	}
	
	/**
	 * Tests the error handling when the user id is too long.
	 */
	@Test
	void test_LP_LongUID() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		assertThrows(
				InvalidPlayerrException.class, 
				() -> vent.LoadPlayer(DEFAULT_STEAMID.concat("1234"))
		);
	}
	
	/**
	 * Tests the error handling when the user id is empty.
	 */
	@Test
	void test_LP_Empty() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		assertThrows(
				InvalidPlayerrException.class, 
				() -> vent.LoadPlayer("")
		);
	}
	
/*******************************************************\
 *                      LoadGame                       *
\*******************************************************/	
	
	/**
	 * Verify the normal steam game creation works.
	 */
	@Test
	void test_LG_Normal() {
		//TODO clear Game from DB (test DB)
		Chimney vent = new Chimney();
		try {
			vent.LoadPlayer(DEFAULT_STEAMID);
		}
		catch (InvalidPlayerrException ipe) {
			System.out.println(ipe.getMessage());
		}
		//TODO verify the game is now in the DB
	}
	
	/**
	 * Test the failure expected when a game id is used which is greater than steam has.
	 */
	@Test
	void test_LG_MaxGID() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		assertThrows(
				InvalidPlayerrException.class, 
				() -> vent.LoadGame(2147483647) //max int - don't expect this to be a steam game
		);
	}
	
	/**
	 * Test the failure when 0 is used as the game id.
	 */
	@Test
	void test_LG_ZeroGID() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		assertThrows(
				InvalidPlayerrException.class, 
				() -> vent.LoadGame(0)
		);
	}
	
	/**
	 * Test catching the failure when a negative number is used for the game id.
	 */
	@Test
	void test_LG_NegGID() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		assertThrows(
				InvalidPlayerrException.class, 
				() -> vent.LoadGame(DEFAULT_GAMEID * -1)
		);
	}
}
