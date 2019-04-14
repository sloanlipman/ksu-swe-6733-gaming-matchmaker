package com.gamingMatchMaker.gamingMatchMaker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gamingMatchMaker.gamingMatchMaker.controller.authorization.UserDetail;
import com.gamingMatchMaker.gamingMatchMaker.service.ProfileService.ProfileService;
import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserException;

@CrossOrigin(origins="*", allowedHeaders="*")
@RestController
@RequestMapping("/api")
public class ProfileController {

	@Autowired
	private ProfileService service;
	
	@GetMapping("/profile/get/{id:[\\d]+}")
	public ResponseEntity<UserDetail> GetProfile(@PathVariable Integer id) {
		try {
			UserDetail ud = new UserDetail(service.GetUserProfile(id));
	        return new ResponseEntity<>(ud, HttpStatus.OK);
		}
		catch(UserException ue) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/profile/save/{id:[\\d]+}")
	public ResponseEntity<String> SaveProfile(@PathVariable Integer id, @RequestBody UserDetail ud) {
		//create the carry object
		SaveChangesAttempt scr = new SaveChangesAttempt(ud);
		
		//call for processing
		if(service.SaveProfile(scr)) {
			//success! - just kick back all good
			return new ResponseEntity<String>("Profile Updated Successfully", HttpStatus.OK);
		}
		else {
			//return the error message and 400 error
			return new ResponseEntity<String>(scr.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
}
