package com.gamingMatchMaker.gamingMatchMaker.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
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
	
	@Test
	public void test_Ints_GetAll() throws Exception {
		
        String mockResponseJSON = readFileFromResources("GetAllInterestsRsp.json");
        
		RequestBuilder smith = MockMvcRequestBuilders.get("/api/interests/getall");
		ResultActions res = mockMvc.perform(smith)
			.andExpect(status().isOk())
			.andExpect(content().json(mockResponseJSON));
		
		System.out.println(res.toString());
	}
}
