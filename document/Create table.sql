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
INSERT [dbo].[User] ([UserID], [UserName], [Password], [DisplayName]) VALUES (2, N'admin', N'C4CA4238A0B923820DCC509A6F75849B', N'����Ա')
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
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (1, 1, 0, N'b1', N'����칫ϵ��', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (2, 1, 0, N'b2', N'�����鿯ϵ��', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (3, 1, 0, N'b3', N'��Ʒ��װϵ��', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (4, 1, 0, N'b4', N'������Ʒϵ��', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (5, 1, 0, N'b5', N'�ٶ�����ϵ��', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (6, 1, 1, N'b1-s1', N'��Ƭ', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (7, 1, 1, N'b1-s2', N'����', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (8, 1, 1, N'b1-s3', N'���', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (9, 1, 1, N'b1-s4', N'���ɽ�', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (10, 1, 1, N'b1-s5', N'����', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (11, 1, 1, N'b1-s6', N'��ҳ', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (12, 1, 1, N'b1-s7', N'����', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (13, 1, 1, N'b1-s8', N'��־', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (14, 1, 2, N'b2-s1', N'��Ƭ1', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (15, 1, 2, N'b2-s2', N'����', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (16, 1, 2, N'b2-s3', N'���', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (17, 1, 2, N'b2-s4', N'���ɽ�', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (18, 1, 2, N'b2-s5', N'����', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (19, 1, 2, N'b2-s6', N'��ҳ', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (20, 1, 2, N'b2-s7', N'����', N'')
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (21, 1, 2, N'b2-s8', N'��־', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (22, 2, 0, N'b1', N'�̄��k��ϵ��', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (23, 2, 0, N'b2', N'�������ϵ��', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (24, 2, 0, N'b3', N'�aƷ���bϵ��', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (25, 2, 0, N'b4', N'���նYƷϵ��', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (26, 2, 0, N'b5', N'�ك�����ϵ��', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (27, 2, 22, N'b1-s1', N'��Ƭ', NULL)
INSERT [dbo].[ProductType] ([ProductTypeID], [LanguageID], [ParentTypeID], [Code], [Name], [Remark]) VALUES (28, 2, 22, N'b1-s2', N'�Γ�', NULL)
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
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (1, 6, NULL, NULL, N'���Ǹ���Ʒ', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (2, 14, N'c001', N'n001', N'<p>123</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-09/6353523340432075546541364.jpg', N'http://localhost:54772/UEditor/net/upload1/2014-05-09/6353523342068075547724519.jpg', 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (3, 7, N'c002', N'n002', N'<p>321</p>', N'/Content/images/admin/temp.png', N'/Content/images/admin/temp.png', 1, 1)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (4, 16, N'c003', N'n003', N'<p>1234</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (5, 15, N'123', N'��', N'<p>���ڽ�</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (6, 15, N'123', N'��', N'<p>���ڽ�</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (7, 15, N'123', N'��', N'<p>���ڽ�</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (8, 28, N'11', N'ѧϰ', N'<p>�ú�ѧϰ����������</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (9, 28, N'11', N'ѧϰ', N'<p>�ú�ѧϰ����������</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (10, 6, NULL, N'ѧϰ', N'<p>ѧϰ</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (11, 6, NULL, N'ѧϰ', N'<p>ѧϰ</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (12, 27, NULL, N'�W��', N'<p>�W��</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (13, 28, NULL, N'�W��', N'<p>�W��</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (14, 7, NULL, N'ѧϰ', N'<p>ѧϰ</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (15, 27, NULL, N'�W��', N'<p>�W���W���W���W���W��</p>', NULL, NULL, 0, 0)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (16, 6, N'1', N'��Ʒ1', N'<p>��Ʒ��Ϣ</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg', 1, 1)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (17, 27, N'1', N'�aƷ1', N'<p>�aƷ��Ϣ</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg', 1, 1)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (18, 17, N'1111', N'��Ʒ21', N'<p>��Ʒ21</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353551660276936466741116.jpg', 1, 1)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [Code], [Name], [Text], [BigPic], [SmallPic], [IsRecommend], [IsShow]) VALUES (19, 27, N'111', N'�aƷ2', N'<p>�aƷ2</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-12//6353551660276936466741116.jpg', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353551660276936466741116.jpg', 1, 1)
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
INSERT [dbo].[Language] ([LanguageID], [Code], [Name]) VALUES (1, N'cn', N'����')
INSERT [dbo].[Language] ([LanguageID], [Code], [Name]) VALUES (2, N'big5', N'����')
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
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (1, 1, N'footer', N'<p>HongKong Address:Unit C,20/F.,Nathan Commercial Building, 430-436 Nathan Road,Yaumatei,Kowloon. &nbsp; Tel: +852 3621 0809 &nbsp; &nbsp;+852 6915 2564</p><p>��ݸ��˾��ַ: ��ݸ�г������øڸ���·��ʢ������¥ &nbsp; &nbsp;�绰: 0769-3321 8944 &nbsp; ����: 0769-8275 0856</p><p>רӪ: ��Ƭ��������˵���飬�ʿ����ʺУ��ֹ��У�����������������Ƿ⣬�ؿ���ֽ��ӡˢ</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (2, 2, N'footer', N'1', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (3, 3, N'footer', N'2', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
INSERT [dbo].[Information] ([InformationID], [LanguageID], [Code], [Text], [BannerPic]) VALUES (4, 1, N'about', N'<p>��������´���ϸ����</p>', N'http://localhost:54772/UEditor/net/upload1/2014-05-12/6353548908501235573024339.jpg')
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
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (1, 1, N'menu', N'�˵�')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (2, 2, N'menu', N'�ˆ�')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (3, 3, N'menu', N'menu')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (4, 1, N'title', N'����')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (5, 2, N'title', N'���}')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (6, 3, N'title', N'title')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (7, 1, N'cooperation', N'��������')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (8, 2, N'cooperation', N'��������')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (9, 3, N'cooperation', N'Cooperation ')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (10, 1, N'other', N'����')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (11, 2, N'other', N'����')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (12, 3, N'other', N'Other')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (13, 1, N'pager', N'��ҳ����')
INSERT [dbo].[I18NType] ([I18NTypeID], [LanguageID], [Code], [Name]) VALUES (14, 2, N'pager', N'��퓌���')
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
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (1, 1, 1, N'home', N'��ҳ', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (2, 1, 2, N'about', N'�����´�', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (3, 1, 3, N'price', N'��Ʒ�۸�', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (4, 1, 4, N'facilities', N'�����豸', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (5, 1, 5, N'display', N'��Ʒչʾ', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (6, 1, 6, N'information', N'��ҵ֪ʶ', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (7, 1, 7, N'recuit', N'��Ƹ��Ϣ', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (8, 1, 8, N'contact', N'��ϵ����', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (9, 2, 1, N'home', N'���', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (10, 2, 2, N'about', N'�P춄���', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (11, 2, 3, N'price', N'�aƷ�r��', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (12, 2, 4, N'facilities', N'���a�O��', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (13, 2, 5, N'display', N'�aƷչʾ', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (14, 2, 6, N'information', N'�ИI֪�R', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (15, 2, 7, N'career', N'��Ƹ��Ϣ', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (16, 2, 8, N'contact', N'�M�҂�', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (17, 3, 1, N'home', N'Home', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (18, 3, 2, N'about', N'About Us', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (19, 3, 3, N'price', N'Price', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (20, 3, 4, N'facilities', N'Facilities', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (21, 3, 5, N'display', N'Sisplay', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (22, 3, 6, N'information', N'Information', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (23, 3, 7, N'recuit', N'Recuit', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (24, 3, 8, N'contact', N'Contact Us', N'')
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (25, 4, NULL, N'ptype', N'��Ʒ����', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (26, 4, NULL, N'precommend', N'��Ʒ�Ƽ�', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (27, 4, NULL, N'pdisplay', N'��Ʒչʾ', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (28, 4, NULL, N'cooperation', N'��������', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (29, 5, NULL, N'ptype', N'�aƷ���', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (30, 5, NULL, N'precommend', N'�aƷ���]', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (31, 5, NULL, N'pdisplay', N'�aƷչʾ', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (32, 5, NULL, N'cooperation', N'��������', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (33, 6, NULL, N'ptype', N'Product Type', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (34, 6, NULL, N'precommend', N'Product Recommend', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (35, 6, NULL, N'pdisplay', N'Product Display', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (36, 6, NULL, N'cooperation', N'Cooperation ', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (37, 7, 1, N'c1', N'�ͻ�������ϵ', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (38, 7, 2, N'c2', N'������������', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (39, 7, 3, N'c3', N'�����������', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (40, 7, 4, N'c4', N'����ӡˢ�ӹ�', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (41, 7, 5, N'c5', N'�ʼ��Ʒ��װ', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (42, 7, 6, N'c6', N'׼ʱ�ͻ��տ�', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (43, 7, 7, N'c7', N'�ۺ���ٷ���', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (44, 8, 1, N'c1', N'�͑������M', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (45, 8, 2, N'c2', N'������������', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (46, 8, 3, N'c3', N'�OӋ�u�����', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (47, 8, 4, N'c4', N'���aӡˢ�ӹ�', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (48, 8, 5, N'c5', N'�|�z��Ʒ���b', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (49, 8, 6, N'c6', N'�ʕr��؛�տ�', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (50, 8, 7, N'c7', N'�����ۙ����', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (51, 9, 1, N'c1', N'c1', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (52, 9, 2, N'c2', N'c2', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (53, 9, 3, N'c3', N'c3', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (54, 9, 4, N'c4', N'c4', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (55, 9, 5, N'c5', N'c5', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (56, 9, 6, N'c6', N'c6', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (57, 9, 7, N'c7', N'c7', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (58, 10, NULL, N'pmore', N'�����Ʒ����', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (59, 11, NULL, N'pmore', N'����aƷՈ�c��', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (60, 12, NULL, N'pmore', N'more...', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (61, 4, NULL, N'wstitle', N'��ݸ�´�ӡˢ��Ʒ���޹�˾', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (62, 5, NULL, N'wstitle', N'�|ݸ��ӡˢ�uƷ���޹�˾', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (63, 6, NULL, N'wstitle', N'DongGuan New Mind Printing Products Co.,Ltd.', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (64, 4, NULL, N'allproduct', N'���в�Ʒ', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (65, 5, NULL, N'allproduct', N'���ЮaƷ', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (66, 6, NULL, N'allproduct', N'All Products', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (67, 13, NULL, N'firstpage', N'��ҳ', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (68, 13, NULL, N'prepage', N'��һҳ', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (69, 13, NULL, N'nextpage', N'��һҳ', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (70, 13, NULL, N'endpage', N'βҳ', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (71, 14, NULL, N'firstpage', N'���', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (72, 14, NULL, N'prepage', N'��һ�', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (73, 14, NULL, N'nextpage', N'��һ�', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (74, 14, NULL, N'endpage', N'β�', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (75, 15, NULL, N'firstpage', N'First', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (76, 15, NULL, N'prepage', N'Previous', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (77, 15, NULL, N'nextpage', N'Next', NULL)
INSERT [dbo].[I18N] ([I18NID], [I18NTypeID], [OrderID], [Code], [Name], [Remark]) VALUES (78, 15, NULL, N'lastpage', N'Last', NULL)
SET IDENTITY_INSERT [dbo].[I18N] OFF
