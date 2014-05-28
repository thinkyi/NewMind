USE [NewMind]
GO
/****** Object:  Table [dbo].[User]    Script Date: 05/16/2014 18:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[User](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
	[DisplayName] [nvarchar](50) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[User] ON
INSERT [dbo].[User] ([UserID], [UserName], [Password], [DisplayName]) VALUES (1, N'sadmin', N'054D67A62E1E25C7EBB278A834A4018E', N'Super Admin')
INSERT [dbo].[User] ([UserID], [UserName], [Password], [DisplayName]) VALUES (2, N'admin', N'C4CA4238A0B923820DCC509A6F75849B', N'管理员')
SET IDENTITY_INSERT [dbo].[User] OFF
/****** Object:  Table [dbo].[ProductType]    Script Date: 05/16/2014 18:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ProductType](
	[ProductTypeID] [int] IDENTITY(1,1) NOT NULL,
	[LanguageID] [int] NULL,
	[ParentTypeID] [int] NULL,
	[Code] [varchar](20) NULL,
	[Name] [nvarchar](100) NULL,
	[Remark] [nvarchar](500) NULL,
 CONSTRAINT [PK_ProductType] PRIMARY KEY CLUSTERED 
(
	[ProductTypeID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[ProductType] ON
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (1, 1, 0, N'b1', N'商务办公系列', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (2, 1, 0, N'b2', N'海报书刊系列', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (3, 1, 0, N'b3', N'产品包装系列', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (4, 1, 0, N'b4', N'节日礼品系列', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (5, 1, 0, N'b5', N'少儿益智系列', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (6, 1, 1, N'b1-s1', N'名片', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (7, 1, 1, N'b1-s2', N'单据', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (8, 1, 1, N'b1-s3', N'表格', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (9, 1, 1, N'b1-s4', N'不干胶', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (10, 1, 1, N'b1-s5', N'单张', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (11, 1, 1, N'b1-s6', N'折页', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (12, 1, 1, N'b1-s7', N'海报', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (13, 1, 1, N'b1-s8', N'杂志', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (14, 1, 2, N'b2-s1', N'名片1', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (15, 1, 2, N'b2-s2', N'单据', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (16, 1, 2, N'b2-s3', N'表格', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (17, 1, 2, N'b2-s4', N'不干胶', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (18, 1, 2, N'b2-s5', N'单张', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (19, 1, 2, N'b2-s6', N'折页', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (20, 1, 2, N'b2-s7', N'海报', N'')
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (21, 1, 2, N'b2-s8', N'杂志', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (22, 2, 0, N'b1', N'商務辦公系列', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (23, 2, 0, N'b2', N'海報書刊系列', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (24, 2, 0, N'b3', N'產品包裝系列', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (25, 2, 0, N'b4', N'節日禮品系列', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (26, 2, 0, N'b5', N'少兒益智系列', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (27, 2, 22, N'b1-s1', N'名片', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (28, 2, 22, N'b1-s2', N'單據', NULL)
SET IDENTITY_INSERT [dbo].[ProductType] OFF
/****** Object:  Table [dbo].[Product]    Script Date: 05/16/2014 18:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Product](
	[ProductID] [int] IDENTITY(1,1) NOT NULL,
	[ProductTypeID] [int] NULL,
	[Code] [varchar](20) NULL,
	[Name] [nvarchar](100) NULL,
	[Text] [nvarchar](max) NULL,
	[BigPic] [nvarchar](300) NULL,
	[SmallPic] [nvarchar](300) NULL,
	[IsRecommend] [bit] NULL,
	[IsShow] [bit] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (1, 6, NULL, NULL, N'这是个产品', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (2, 14, N'c001', N'n001', N'<p>123</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-09/6353523340432075546541364.jpg', N'http://localhost:54772/UEditor/net/upload1/2014-05-09/6353523342068075547724519.jpg', 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (3, 7, N'c002', N'n002', N'<p>321</p>', N'/Content/images/admin/temp.png', N'/Content/images/admin/temp.png', 1, 1)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (4, 16, N'c003', N'n003', N'<p>1234</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (5, 15, N'123', N'龙', N'<p>龙在叫</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (6, 15, N'123', N'龙', N'<p>龙在叫</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (7, 15, N'123', N'龍', N'<p>龍在叫</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (8, 28, N'11', N'学习', N'<p>好好学习，天天向上</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (9, 28, N'11', N'学习', N'<p>好好学习，天天向上</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (10, 6, NULL, N'学习', N'<p>学习</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (11, 6, NULL, N'学习', N'<p>学习</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (12, 27, NULL, N'學習', N'<p>學習</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (13, 28, NULL, N'學習', N'<p>學習</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (14, 7, NULL, N'学习', N'<p>学习</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (15, 27, NULL, N'學習', N'<p>學習學習學習學習學習</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (16, 6, N'1', N'产品1', N'<p>产品信息</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg', 1, 1)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (17, 27, N'1', N'產品1', N'<p>產品信息</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg', 1, 1)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (18, 17, N'1111', N'产品21', N'<p>产品21</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353551660276936466741116.jpg', 1, 1)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (19, 27, N'111', N'產品2', N'<p>產品2</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-12//6353551660276936466741116.jpg', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353551660276936466741116.jpg', 1, 1)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (20, 10, N'1111', N'11111', N'<p>111111</p>', NULL, NULL, 0, 0)
SET IDENTITY_INSERT [dbo].[Product] OFF
/****** Object:  Table [dbo].[Language]    Script Date: 05/16/2014 18:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Language](
	[LanguageID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](10) NULL,
	[Name] [nvarchar](20) NULL,
 CONSTRAINT [PK_Language] PRIMARY KEY CLUSTERED 
(
	[LanguageID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Language] ON
INSERT [dbo].[Language] ([LanguageID], [Code], [Name]) VALUES (1, N'cn', N'简体')
INSERT [dbo].[Language] ([LanguageID], [Code], [Name]) VALUES (2, N'big5', N'繁体')
INSERT [dbo].[Language] ([LanguageID], [Code], [Name]) VALUES (3, N'en', N'English')
SET IDENTITY_INSERT [dbo].[Language] OFF
/****** Object:  Table [dbo].[Information]    Script Date: 05/16/2014 18:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Information](
	[InformationID] [int] IDENTITY(1,1) NOT NULL,
	[LanguageID] [int] NULL,
	[Code] [varchar](20) NULL,
	[Text] [nvarchar](max) NULL,
	[BannerPic] [nvarchar](300) NULL,
 CONSTRAINT [PK_Information] PRIMARY KEY CLUSTERED 
(
	[InformationID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Information] ON
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (1, 1, N'footer', N'<p>HongKong Address:Unit C,20/F.,Nathan Commercial Building, 430-436 Nathan Road,Yaumatei,Kowloon. &nbsp; Tel: +852 3621 0809 &nbsp; &nbsp;+852 6915 2564</p><p>东莞公司地址: 东莞市长安镇厦岗福海路华盛大厦五楼 &nbsp; &nbsp;电话: 0769-3321 8944 &nbsp; 传真: 0769-8275 0856</p><p>专营: 名片，海报，说明书，彩卡，彩盒，手工盒，手挽袋，挂历，利是封，贺卡等纸类印刷</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (2, 2, N'footer', N'1', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (3, 3, N'footer', N'2', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (4, 1, N'about', N'<p>简体关于新创详细内容</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (5, 2, N'about', N'about2', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (6, 3, N'about', N'about3', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (7, 1, N'price', N'price1', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (8, 2, N'price', N'price2', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (9, 3, N'price', N'price2', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (10, 1, N'facilities', N'facilities1', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (11, 2, N'facilities', N'facilities2', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (12, 3, N'facilities', N'facilities3', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (13, 1, N'display', NULL, N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353551660276936466741116.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (14, 2, N'display', NULL, N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (15, 3, N'display', NULL, N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (16, 1, N'information', N'information1', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (17, 2, N'information', N'information2', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (18, 3, N'information', N'information3', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (19, 1, N'recuit', N'recuit1', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (20, 2, N'recuit', N'recuit2', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (21, 3, N'recuit', N'recuit3', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (22, 1, N'contact', N'contact1', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (23, 2, N'contact', N'contact2', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (24, 3, N'contact', N'contact3', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
SET IDENTITY_INSERT [dbo].[Information] OFF
/****** Object:  Table [dbo].[I18NType]    Script Date: 05/16/2014 18:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[I18NType](
	[I18NTypeID] [int] IDENTITY(1,1) NOT NULL,
	[LanguageID] [int] NULL,
	[Code] [varchar](20) NULL,
	[Name] [nvarchar](50) NULL,
 CONSTRAINT [PK_I18NType] PRIMARY KEY CLUSTERED 
(
	[I18NTypeID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[I18NType] ON
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (1, 1, N'menu', N'菜单')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (2, 2, N'menu', N'菜單')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (3, 3, N'menu', N'menu')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (4, 1, N'title', N'标题')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (5, 2, N'title', N'標題')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (6, 3, N'title', N'title')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (7, 1, N'cooperation', N'合作流程')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (8, 2, N'cooperation', N'合作流程')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (9, 3, N'cooperation', N'Cooperation ')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (10, 1, N'other', N'其他')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (11, 2, N'other', N'其他')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (12, 3, N'other', N'Other')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (13, 1, N'pager', N'分页导航')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (14, 2, N'pager', N'分頁導航')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (15, 3, N'pager', N'Paging Nav')
SET IDENTITY_INSERT [dbo].[I18NType] OFF
/****** Object:  Table [dbo].[I18N]    Script Date: 05/16/2014 18:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[I18N](
	[I18NID] [int] IDENTITY(1,1) NOT NULL,
	[I18NTypeID] [int] NULL,
	[OrderID] [int] NULL,
	[Code] [varchar](20) NULL,
	[Name] [nvarchar](100) NULL,
	[Remark] [nvarchar](500) NULL,
 CONSTRAINT [PK_I18N] PRIMARY KEY CLUSTERED 
(
	[I18NID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[I18N] ON
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (1, 1, 1, N'home', N'首页', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (2, 1, 2, N'about', N'关于新创', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (3, 1, 3, N'price', N'产品价格', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (4, 1, 4, N'facilities', N'生产设备', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (5, 1, 5, N'display', N'产品展示', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (6, 1, 6, N'information', N'行业知识', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (7, 1, 7, N'recuit', N'招聘信息', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (8, 1, 8, N'contact', N'联系我们', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (9, 2, 1, N'home', N'首頁', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (10, 2, 2, N'about', N'關於創新', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (11, 2, 3, N'price', N'產品價格', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (12, 2, 4, N'facilities', N'生產設備', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (13, 2, 5, N'display', N'產品展示', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (14, 2, 6, N'information', N'行業知識', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (15, 2, 7, N'career', N'招聘信息', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (16, 2, 8, N'contact', N'聯繫我們', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (17, 3, 1, N'home', N'Home', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (18, 3, 2, N'about', N'About Us', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (19, 3, 3, N'price', N'Price', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (20, 3, 4, N'facilities', N'Facilities', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (21, 3, 5, N'display', N'Sisplay', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (22, 3, 6, N'information', N'Information', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (23, 3, 7, N'recuit', N'Recuit', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (24, 3, 8, N'contact', N'Contact Us', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (25, 4, NULL, N'ptype', N'产品分类', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (26, 4, NULL, N'precommend', N'产品推荐', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (27, 4, NULL, N'pdisplay', N'产品展示', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (28, 4, NULL, N'cooperation', N'合作流程', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (29, 5, NULL, N'ptype', N'產品分類', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (30, 5, NULL, N'precommend', N'產品推薦', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (31, 5, NULL, N'pdisplay', N'產品展示', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (32, 5, NULL, N'cooperation', N'合作流程', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (33, 6, NULL, N'ptype', N'Product Type', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (34, 6, NULL, N'precommend', N'Product Recommend', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (35, 6, NULL, N'pdisplay', N'Product Display', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (36, 6, NULL, N'cooperation', N'Cooperation ', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (37, 7, 1, N'c1', N'客户初次联系', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (38, 7, 2, N'c2', N'建立合作意向', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (39, 7, 3, N'c3', N'设计制作打样', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (40, 7, 4, N'c4', N'生产印刷加工', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (41, 7, 5, N'c5', N'质检成品包装', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (42, 7, 6, N'c6', N'准时送货收款', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (43, 7, 7, N'c7', N'售后跟踪服务', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (44, 8, 1, N'c1', N'客戶初次聯繫', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (45, 8, 2, N'c2', N'建立合作意向', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (46, 8, 3, N'c3', N'設計製作打樣', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (47, 8, 4, N'c4', N'生產印刷加工', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (48, 8, 5, N'c5', N'質檢成品包裝', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (49, 8, 6, N'c6', N'準時送貨收款', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (50, 8, 7, N'c7', N'售後跟蹤服務', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (51, 9, 1, N'c1', N'c1', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (52, 9, 2, N'c2', N'c2', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (53, 9, 3, N'c3', N'c3', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (54, 9, 4, N'c4', N'c4', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (55, 9, 5, N'c5', N'c5', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (56, 9, 6, N'c6', N'c6', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (57, 9, 7, N'c7', N'c7', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (58, 10, NULL, N'pmore', N'更多产品请点击', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (59, 11, NULL, N'pmore', N'更多產品請點擊', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (60, 12, NULL, N'pmore', N'more...', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (61, 4, NULL, N'wstitle', N'东莞新创印刷制品有限公司', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (62, 5, NULL, N'wstitle', N'東莞新創印刷製品有限公司', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (63, 6, NULL, N'wstitle', N'DongGuan New Mind Printing Products Co.,Ltd.', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (64, 4, NULL, N'allproduct', N'所有产品', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (65, 5, NULL, N'allproduct', N'所有產品', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (66, 6, NULL, N'allproduct', N'All Products', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (67, 13, NULL, N'firstpage', N'首页', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (68, 13, NULL, N'prepage', N'上一页', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (69, 13, NULL, N'nextpage', N'下一页', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (70, 13, NULL, N'endpage', N'尾页', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (71, 14, NULL, N'firstpage', N'首頁', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (72, 14, NULL, N'prepage', N'上一頁', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (73, 14, NULL, N'nextpage', N'下一頁', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (74, 14, NULL, N'endpage', N'尾頁', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (75, 15, NULL, N'firstpage', N'First', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (76, 15, NULL, N'prepage', N'Previous', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (77, 15, NULL, N'nextpage', N'Next', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (78, 15, NULL, N'lastpage', N'Last', NULL)
SET IDENTITY_INSERT [dbo].[I18N] OFF
