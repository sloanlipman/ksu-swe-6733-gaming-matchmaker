package com.gamingMatchMaker.gamingMatchMaker.controller.MatchMaker;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gamingMatchMaker.gamingMatchMaker.controller.authorization.UserDetail;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import com.gamingMatchMaker.gamingMatchMaker.service.MatchingService.MatchingService;
import com.gamingMatchMaker.gamingMatchMaker.service.MatchingService.PluginException;
import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserException;

@CrossOrigin(origins="*", allowedHeaders="*")
@RestController
@RequestMapping("/api")
public class MatchingController {

	@Autowired
	private MatchingService service;
	
	/**
	 * Matches the player for the given id to all the other players in the system.
	 * @param id The id of the player making the requests.
	 * @return The UserDetails of the other players who meet the criteria.
	 */
	@GetMapping("/enginer/match/{id:[\\d]+}")
	public ResponseEntity<ArrayList<UserDetail>> GetMatches(@PathVariable Integer id) {
		//create the return list
		ArrayList<UserDetail> uds = new ArrayList<>();
		//get the matched users
		List<UserRec> urs = new ArrayList<>(); //not exactly an arraylist, but close enough and we're about to re-assign the var
		try {
			urs = service.getMatches(id);
		}
		catch (UserException ue) {
			//build and send the error response
			return new ResponseEntity<ArrayList<UserDetail>>(uds, HttpStatus.BAD_REQUEST);
		}
		
		//convert the user records into user details
		for(UserRec ur : urs) {
			uds.add(new UserDetail(ur));
		}
		
		//build and send the response
		return new ResponseEntity<ArrayList<UserDetail>>(uds, HttpStatus.OK);
	}
	
	/**
	 * Read the full list of available priority plugins.
	 * @return
	 */
	@GetMapping("/priority/getall")
	public ResponseEntity<List<String>> getPriorities() {
		List<String> priorities = service.getAllPlugins();
		return new ResponseEntity<>(priorities,new HttpHeaders(), HttpStatus.OK);
	}
	
	/**
	 * Change the order in which different factors are used to match players.
	 * @param id
	 * @param priorities
	 * @return
	 */
	@PostMapping("/priority/set/{id:[\\\\d]+}")
	public ResponseEntity<String> setPriorities(@PathVariable long id, @RequestBody ArrayList<String> priorities) {
		//set some initial values for success
		String err = "";
		HttpStatus stat = HttpStatus.OK;
		
		//try to set this order
		try {
			service.setPriorities(priorities);
		}
		catch (PluginException pe) {
			//well it failed - save the error and change the return code
			err = pe.getMessage();
			stat = HttpStatus.BAD_REQUEST;
		}
		
		//send whatever we have there back
		return new ResponseEntity<>(err,new HttpHeaders(), stat);
	}
	
}