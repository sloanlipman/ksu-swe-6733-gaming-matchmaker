/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2018, Grum Ltd (Romain Gallet)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * Neither the name of Geocalc nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

<<<<<<< HEAD
/**
 * Attribution: Grum Limited
 * https://github.com/grumlimited
 * Version: 0.5.8, downloaded 3/17/19
 */
=======
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
package com.grum.geocalc;

import static java.lang.Math.abs;

/**
 * Represents coordinates given in
<<<<<<< HEAD
 * Degrees Minutes decimal-seconds (D M s) format 
=======
 * Degrees Minutes decimal-seconds (D M s) format
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
 *
 * @author rgallet
 */
public class DMSCoordinate extends Coordinate {

    public final double wholeDegrees, minutes, seconds;

    DMSCoordinate(double wholeDegrees, double minutes, double seconds) {
        this.wholeDegrees = wholeDegrees;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    @Override
    double degrees() {
        double decimalDegrees = abs(wholeDegrees) + minutes / 60 + seconds / 3600;

        if (wholeDegrees < 0) {
            decimalDegrees = -decimalDegrees;
        }

        return decimalDegrees;
    }

    /**
     * @return minutes
     * @deprecated use minutes
     */
    @Deprecated
    public double getMinutes() {
        return minutes;
    }

    /**
     * @return wholeDegrees
     * @deprecated use wholeDegrees
     */
    @Deprecated
    public double getWholeDegrees() {
        return wholeDegrees;
    }

    /**
     * @return seconds
     * @deprecated use seconds
     */
    @Deprecated
    public double getSeconds() {
        return seconds;
    }

    @Override
    public String toString() {
        return "DMSCoordinate{" +
                "wholeDegrees=" + wholeDegrees +
                ", minutes=" + minutes +
                ", seconds=" + seconds +
                '}';
    }
}
