package com.gamingMatchMaker.gamingMatchMaker.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.util.ArrayList;
import static org.mockito.Mockito.when;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.gamingMatchMaker.gamingMatchMaker.service.InterestService.InterestService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class InterestControllerTest extends ControllerTest {

	@MockBean
	private InterestService intService;
	
    @Before
    public void setupService() {
    	ArrayList<String> rsp = new ArrayList<String>();
    	rsp.add("one");
    	rsp.add("two");
    	rsp.add("a hobby");
    	
        when(intService.GetInterests()).thenReturn(rsp);
    }
	
	@Test
	public void test_Ints_GetAll() throws Exception {
		
        String mockResponseJSON = readFileFromResources("GetAllInterestsRsp.json");
        
		RequestBuilder smith = MockMvcRequestBuilders.get("/api/interests/getall")
                .accept(MediaType.APPLICATION_JSON);
		ResultActions res = mockMvc.perform(smith)
			.andExpect(status().isOk())
			.andExpect(content().json(mockResponseJSON));
		
		System.out.println(res.toString());
	}
	
	@Test
	public void test_Ints_Add() throws Exception {
		
		//make the request
		RequestBuilder smith = MockMvcRequestBuilders.get("/api/interests/getall")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"NewInterest\" }");
		
		//do the action - should work
		ResultActions res = mockMvc.perform(smith)
			.andExpect(status().isOk());
	
		//TODO wish we were checking this was added...
	
		System.out.println(res.toString());
	}

}
