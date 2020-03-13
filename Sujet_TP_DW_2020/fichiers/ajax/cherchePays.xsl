<?xml version="1.0"?>

<xsl:stylesheet version  ="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:param name="code" select = "string('unknown')" />

<xsl:template match="/">
<HTML>
  <BODY>
  <UL>
    Renseignements du pays recherché:
    <br/>
	Code : <xsl:value-of select="$code"/><br/>
	Nom officiel : <xsl:value-of select="//country[codes/cca2=$code]/name/official"/>
	<br/>
	Capitale : <xsl:value-of select="//country[codes/cca2=$code]/capital"/>
  </UL>
  <div>
	  <table border="3" width="600" align="center">
		<tr>
			<th>Nom (commun)</th>
			<th>Capitale</th>
			<th>Drapeau</th>
		</tr>
		<tr>
			<td>
				<xsl:value-of select="//country[codes/cca2=$code]/name/official"/>
			</td>
			<td>
				<xsl:value-of select="//country[codes/cca2=$code]/capital"/>
			</td>
			<td>
				<img src="{concat('http://www.geonames.org/flags/x/',translate($code,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'.gif')}" alt="" height="40" width="60"/>
			</td>
		</tr>
	  </table>
  </div>
  </BODY>
</HTML>			
	
</xsl:template>

</xsl:stylesheet>