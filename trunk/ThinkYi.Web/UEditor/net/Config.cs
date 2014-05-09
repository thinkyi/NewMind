using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Config 的摘要说明
/// </summary>
public class Config
{
    public static string[] ImageSavePath = new string[] { "upload1", "upload2", "upload3" };
    public static string fileNameFormat = "{yyyy}-{mm}-{dd}_{rand:4}_{filename}";
}