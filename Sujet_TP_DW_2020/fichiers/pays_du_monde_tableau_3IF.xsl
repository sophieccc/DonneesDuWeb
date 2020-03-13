<?xml version = "1.0" encoding = "UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" />
    <xsl:template match="/"> 
        <html> 
            <head> 
                <title> 
                Pays du monde 
            </title> 
            </head> 
            <body style="background-color:white;">
                <h1>Les pays du monde</h1>
                <xsl:apply-templates select="//metadonnees"/>
                <p>Pays avec 6 voisins: 
                <xsl:for-each select="//country[count(borders/neighbour) = 6]">
                    <xsl:value-of select="current()/name/common"/> 
                    <xsl:if test="position() != last()">, </xsl:if> 
                </xsl:for-each>
                </p>
                <p>Pays ayant le plus de voisins : 
			  		<xsl:for-each select="//country">
			  			<xsl:sort select="count(borders/*)" data-type="number" order="descending" />
			  			<xsl:if test='position() = 1'>
							<xsl:value-of select='name/common' /> , nob de voisins : <xsl:value-of select='count(borders/*)' />
			  			</xsl:if>
			  		</xsl:for-each>
                </p>
                <xsl:apply-templates select="//countries"/>
            </body>
        </html> 
    </xsl:template> 
    <xsl:template match="metadonnees">
        <p style="text-align:center; color:blue;">
            Objectif : <xsl:value-of select="objectif"/>
        </p><hr/>
    </xsl:template>

    <xsl:template match="countries">
        <table border="3" width="100%" align="center">
        <xsl:apply-templates select="//country"/>
        </table>
    </xsl:template>

    <xsl:template match="country"> 
        <tr>
        <td>
        <xsl:value-of select="count(preceding-sibling::country)+1"/>
        </td>
            <td>
                <span style="color:green;"><xsl:value-of select="name/common"/></span>
                <span> (<xsl:value-of select="name/official"/>)</span>
                <xsl:if test="name/native_name/@lang='eng'">
                    <br/>
                    <span style="color:blue;">
                        Nom anglais: <xsl:value-of select="name/native_name[@lang='eng']/official"/>
                    </span>        
                </xsl:if> 
            </td>
            <td>
            <xsl:value-of select="capital"/>
            </td>
            <td>
                <xsl:choose>
                    <xsl:when test="borders">
                        <xsl:apply-templates select="borders"/>
                    </xsl:when>
                    <xsl:otherwise>
                    <xsl:if test="landlocked='false'">
                        Île
                    </xsl:if>
                    </xsl:otherwise>
                </xsl:choose>
            </td>
            <td>
            Longitude: <xsl:value-of select="coordinates/@long"/>
            <br/>
            Latitude: <xsl:value-of select="coordinates/@lat"/>
            </td>
            <td>
            <xsl:variable name="lowercase" select="'abcdefghijklmnopqrstuvwxyz'" />
            <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
            <img src="http://www.geonames.org/flags/x/{translate(codes/cca2, $uppercase, $lowercase)}.gif" 
            alt="" height="40" width="60"/> 
            </td>
        </tr>
    </xsl:template>

    <xsl:template match="borders"> 
        <xsl:for-each select="neighbour">
        <xsl:value-of select="//country[codes/cca3=current()]/name/common"/>
        <xsl:if test="position() != last()">, 
        </xsl:if>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>