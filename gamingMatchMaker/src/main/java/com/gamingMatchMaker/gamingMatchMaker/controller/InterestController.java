package com.gamingMatchMaker.gamingMatchMaker.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gamingMatchMaker.gamingMatchMaker.service.InterestService.InterestService;

@RestController
@RequestMapping("/api")
public class InterestController {

	@Autowired
	private InterestService service;
	
	@PostMapping("/interests/getall")
	public ResponseEntity<List<String>> getInterests() {
		//get the interests
		List<String> names = service.GetInterests();

		//build the response
        return new ResponseEntity<>(names,new HttpHeaders(), HttpStatus.OK);
	}
	
	@PostMapping("/interests/add")
	public ResponseEntity<String> AddInterest(@RequestBody String NewInterest) {
		service.AddInterest(NewInterest);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
