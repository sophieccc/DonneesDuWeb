<?xml version="1.0"?>

<xsl:stylesheet version  ="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html"/>

    <xsl:template match="/">
        <html>
            <datalist id="codeList">
                <xsl:apply-templates select= "//country"/>
            </datalist>
        </html>
    </xsl:template>

    <xsl:template match="//country">
        <option value ="{codes/cca2}"> 
            <xsl:value-of select="codes/cca2"/>
        </option>
    </xsl:template>
</xsl:stylesheet>
    