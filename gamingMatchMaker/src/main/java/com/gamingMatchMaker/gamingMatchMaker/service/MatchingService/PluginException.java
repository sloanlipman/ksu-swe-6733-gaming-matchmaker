package com.gamingMatchMaker.gamingMatchMaker.service.MatchingService;

import com.gamingMatchMaker.gamingMatchMaker.service.ServiceException;

public class PluginException extends ServiceException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public PluginException() {
		super("Unspecified Plugin Exception");
	}

	public PluginException(String message) {
		super(message);
	}
	
	

}
