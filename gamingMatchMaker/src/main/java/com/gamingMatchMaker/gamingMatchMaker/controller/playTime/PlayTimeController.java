package com.gamingMatchMaker.gamingMatchMaker.controller.playTime;

import com.gamingMatchMaker.gamingMatchMaker.service.playTIme.PlayTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PlayTimeController {

    @Autowired
    private PlayTimeService service;

    @CrossOrigin
    @GetMapping("/playTimes")
    public ResponseEntity<List<String>> getTimingNames(){
        List<String> result = service.getTimingNames();
        HttpHeaders headers = new HttpHeaders();

        return new ResponseEntity<>(result, headers, HttpStatus.OK);

    }
}
