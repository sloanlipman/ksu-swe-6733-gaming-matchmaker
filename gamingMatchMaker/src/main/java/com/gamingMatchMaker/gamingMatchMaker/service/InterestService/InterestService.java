package com.gamingMatchMaker.gamingMatchMaker.service.InterestService;

import java.util.List;

import com.gamingMatchMaker.gamingMatchMaker.model.Interest;

public interface InterestService {
	List<String> GetInterests();
	void AddInterest(String name);
}
