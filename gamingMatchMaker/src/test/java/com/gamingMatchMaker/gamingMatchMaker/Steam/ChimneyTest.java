package com.gamingMatchMaker.gamingMatchMaker.Steam;

<<<<<<< HEAD
import static org.junit.Assert.*;

import org.junit.*;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ChimneyTest {
	private static final String DEFAULT_STEAMID = "76561197995016920";
	private static final int DEFAULT_GAMEID = 440;

=======
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

>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
/*******************************************************\
 *                     GetAchLevel                     *
\*******************************************************/	
	
	/**
	 * Tests the GetAchLevel when both the user and the game exists.
	 */
	@Test
<<<<<<< HEAD
	public void test_GAL_UserGame() {
=======
	void test_GAL_UserGame() {
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
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
<<<<<<< HEAD
	public void test_GAL_User() {
		Chimney vent = new Chimney();
		try {
			vent.GetAchLevel(DEFAULT_STEAMID, 0);
		} 
		catch (InvalidPlayerrException e) {
			fail("Unexpected Exception " + e.getMessage());
		} 
		catch (InvalidGameException e) { }
=======
	void test_GAL_User() {
		Chimney vent = new Chimney();
		assertThrows(
				InvalidGameException.class, 
				() -> vent.GetAchLevel(DEFAULT_STEAMID, 0)
		);
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
	}
	
	/**
	 * Tests the GetAchLevel when the user id does not exist.
	 */
	@Test
<<<<<<< HEAD
	public void test_GAL_Game() {
		Chimney vent = new Chimney();
		try {
			vent.GetAchLevel(DEFAULT_STEAMID.substring(1), DEFAULT_GAMEID);
		} 
		catch (InvalidPlayerrException e) { } 
		catch (InvalidGameException e) {
			fail("Unexpected Exception " + e.getMessage());
		}
=======
	void test_GAL_Game() {
		Chimney vent = new Chimney();
		assertThrows(
			InvalidPlayerrException.class, 
			() -> vent.GetAchLevel(DEFAULT_STEAMID.substring(1), DEFAULT_GAMEID)
		);
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
	}

	/**
	 * Tests the GetAchLevel when the user id and game id are invalid.
	 */
	@Test
<<<<<<< HEAD
	public void test_GAL_NONE() {
		Chimney vent = new Chimney();
		try {
			vent.GetAchLevel(DEFAULT_STEAMID.substring(1), DEFAULT_GAMEID);
		} 
		catch (InvalidPlayerrException e) { } 
		catch (InvalidGameException e) {
			fail("Unexpected Exception " + e.getMessage());
		}
=======
	void test_GAL_NONE() {
		Chimney vent = new Chimney();
		assertThrows(
			InvalidPlayerrException.class, 
			() -> vent.GetAchLevel(DEFAULT_STEAMID.substring(1), 0)
		);
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
	}

/*******************************************************\
 *                     LoadPlayer                      *
\*******************************************************/	

	/**
	 * Tests the normal actions taken to link a steam account to the user
	 */
	@Test
<<<<<<< HEAD
	public void test_LP_Normal() {
=======
	void test_LP_Normal() {
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
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
<<<<<<< HEAD
	public void test_LP_PartialGames() {
=======
	void test_LP_PartialGames() {
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
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
<<<<<<< HEAD
	public void test_LP_ShortUID() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		try {
			vent.LoadPlayer(DEFAULT_STEAMID.substring(1));
			fail("Completed LoadPlayer with steamID " + DEFAULT_STEAMID.substring(1) + " unexpectedly.");
		}
		//pass in the catch
		catch (InvalidPlayerrException ipe) { }
=======
	void test_LP_ShortUID() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		assertThrows(
				InvalidGameException.class, 
				() -> vent.LoadPlayer(DEFAULT_STEAMID.substring(1))
		);
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
	}
	
	/**
	 * Tests the error handling when the user id is too long.
	 */
	@Test
<<<<<<< HEAD
	public void test_LP_LongUID() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		try {
			vent.LoadPlayer(DEFAULT_STEAMID.concat("1234"));
			fail("Completed LoadPlayer with steamID " + DEFAULT_STEAMID.concat("1234") + " unexpectedly.");
		}
		catch (InvalidPlayerrException ipe) { }
=======
	void test_LP_LongUID() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		assertThrows(
				InvalidPlayerrException.class, 
				() -> vent.LoadPlayer(DEFAULT_STEAMID.concat("1234"))
		);
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
	}
	
	/**
	 * Tests the error handling when the user id is empty.
	 */
	@Test
<<<<<<< HEAD
	public void test_LP_Empty() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		try {
			vent.LoadPlayer("");
			fail("Completed LoadPlayer with empty steamID");
		}
		catch (InvalidPlayerrException ipe) { }
=======
	void test_LP_Empty() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		assertThrows(
				InvalidPlayerrException.class, 
				() -> vent.LoadPlayer("")
		);
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
	}
	
/*******************************************************\
 *                      LoadGame                       *
\*******************************************************/	
	
	/**
	 * Verify the normal steam game creation works.
	 */
	@Test
<<<<<<< HEAD
	public void test_LG_Normal() {
=======
	void test_LG_Normal() {
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
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
<<<<<<< HEAD
	public void test_LG_MaxGID() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		try {
			vent.LoadGame(2147483647);
			fail("Completed LoadGame with MAX_INT as game id");
		}
		//pass on exception
		catch (InvalidGameException e) { } //max int - don't expect this to be a steam game
=======
	void test_LG_MaxGID() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		assertThrows(
				InvalidPlayerrException.class, 
				() -> vent.LoadGame(2147483647) //max int - don't expect this to be a steam game
		);
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
	}
	
	/**
	 * Test the failure when 0 is used as the game id.
	 */
	@Test
<<<<<<< HEAD
	public void test_LG_ZeroGID() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		try {
			vent.LoadGame(0);
			fail("Completed LoadGame with 0 as game id");
		}
		//pass on exception
		catch (InvalidGameException e) { } //max int - don't expect this to be a steam game
=======
	void test_LG_ZeroGID() {
		//TODO clear Player from DB (test DB)
		Chimney vent = new Chimney();
		assertThrows(
				InvalidPlayerrException.class, 
				() -> vent.LoadGame(0)
		);
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
	}
	
	/**
	 * Test catching the failure when a negative number is used for the game id.
	 */
<<<<<<< HEAD
	@Test(expected = InvalidPlayerrException.class)
	public void test_LG_NegGID() {
		//TODO clear Game from DB (test DB)
		Chimney vent = new Chimney();		
		try {
			vent.LoadGame(DEFAULT_GAMEID * -1);
			fail("Completed LoadGame with negative number as game id");
		}
		//pass on exception
		catch (InvalidGameException e) { } //max int - don't expect this to be a steam game
	}

} //end class ChimneyTest
=======
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
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
