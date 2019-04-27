package com.gamingMatchMaker.gamingMatchMaker.service.authService;

import com.gamingMatchMaker.gamingMatchMaker.service.ServiceException;

public class UserException extends ServiceException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserException() {
    }

    public UserException(String message) {
        super(message);
    }

    public UserException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserException(Throwable cause) {
        super(cause);
    }

    public UserException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
