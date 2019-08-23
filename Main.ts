function dateCheck_() {
  var today = new Date();
  var date = today.toJSON().slice(0, 10);
  var nDate =
    date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(nDate);
  if (!sheet) {
    throw "Not scheduled for today";
  } else {
    return sheet;
  }
}

function createUsers_() {
  // var ss = SpreadsheetApp.getActive();
  // var today = new Date();
  // var date = today.toJSON().slice(0, 10);
  // var nDate =
  //   date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);

  // var sheet = ss.getSheetByName(nDate);
  // if (!sheet) {
  //   throw "Not scheduled for today";
  // } else {
  var sheet = dateCheck_();
  var values = sheet.getDataRange().getDisplayValues();

  for (i = 1; i < values.length; i++) {
    var fName = values[i][0];
    var lName = values[i][1];
    var email = values[i][2];
    var password = values[i][3];
    var user;
    try {
      user = AdminDirectory.Users.get(email);
    } catch (e) {
      user = AdminDirectory.Users.insert({
        primaryEmail: email,
        password: password,
        orgUnitPath: "/Users/Generic Accounts",
        name: {
          familyName: lName,
          givenName: fName
        }
      });
      assignLicense_(email);
      addToGroup_(email);
    }
  }
}

function assignLicense_(userId) {
  var productId = "Google-Apps";
  var skuId = "1010020020";
  var results = AdminLicenseManager.LicenseAssignments.insert(
    { userId: userId },
    productId,
    skuId
  );
  Logger.log(results);
}

function addToGroup_(userEmail) {
  var groupEmail = "mxtestgroup@itv.com";
  var member = {
    email: userEmail,
    role: "MEMBER"
  };
  member = AdminDirectory.Members.insert(member, groupEmail);
  Logger.log("User %s added as a member of group %s.", userEmail, groupEmail);
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Automation Menu")
    .addItem("Create Test Accounts", "createUsers_")
    .addSeparator()
    .addItem("Create Test Groups", "createGrps_")
    .addToUi();
}

function test() {
  var email = "simon.lee1@itv.com";
  createGrps_(email);
}

function createGrps_(email) {
  var sheet = dateCheck_();
  var group;
  var response;
  var chunks = email.split("@");
  var domain = chunks[1];
  var domainChunk = domain.split(".");
  var domainName = domainChunk[0];
  var email = "grptest_" + domainName + "@" + domain;
  var description = "Group created for MX Migration testing";
  var name = domain + " test group";
  try {
    group = AdminDirectory.Groups.get(email);
  } catch (error) {
    response = AdminDirectory.Groups.insert({
      email: email,
      description: description,
      name: name
    });

    var settings = [
      (whoCanJoin = "ALL_IN_DOMAIN_CAN_JOIN"),
      (whoCanViewMembership = "ALL_IN_DOMAIN_CAN_VIEW"),
      (whoCanViewGroup = "ALL_IN_DOMAIN_CAN_VIEW"),
      (whoCanInvite = "ALL_MANAGERS_CAN_INVITE"),
      (whoCanAdd = "ALL_MANAGERS_CAN_ADD"),
      (allowExternalMembers = "false"),
      (whoCanPostMessage = "ANYONE_CAN_POST"),
      (allowWebPosting = "true"),
      (maxMessageBytes = "26214400"),
      (isArchived = "false"),
      (archiveOnly = "false"),
      (messageModerationLevel = "MODERATE_NONE"),
      (spamModerationLevel = "MODERATE"),
      (replyTo = "REPLY_TO_IGNORE"),
      (customReplyTo = ""),
      (includeCustomFooter = "false"),
      (customFooterText = ""),
      (sendMessageDenyNotification = "false"),
      (defaultMessageDenyNotificationText = ""),
      (showInGroupDirectory = "true"),
      (allowGoogleCommunication = "false"),
      (membersCanPostAsTheGroup = "false"),
      (messageDisplayFont = "DEFAULT_FONT"),
      (includeInGlobalAddressList = "true"),
      (whoCanLeaveGroup = "ALL_MEMBERS_CAN_LEAVE"),
      (whoCanContactOwner = "ANYONE_CAN_CONTACT"),
      (whoCanAddReferences = "NONE"),
      (whoCanAssignTopics = "NONE"),
      (whoCanUnassignTopic = "NONE"),
      (whoCanTakeTopics = "NONE"),
      (whoCanMarkDuplicate = "NONE"),
      (whoCanMarkNoResponseNeeded = "NONE"),
      (whoCanMarkFavoriteReplyOnAnyTopic = "NONE"),
      (whoCanMarkFavoriteReplyOnOwnTopic = "NONE"),
      (whoCanUnmarkFavoriteReplyOnAnyTopic = "NONE"),
      (whoCanEnterFreeFormTags = "NONE"),
      (whoCanModifyTagsAndCategories = "NONE"),
      (favoriteRepliesOnTop = "true"),
      (whoCanApproveMembers = "ALL_MANAGERS_CAN_APPROVE"),
      (whoCanBanUsers = "OWNERS_AND_MANAGERS"),
      (whoCanModifyMembers = "OWNERS_AND_MANAGERS"),
      (whoCanApproveMessages = "OWNERS_AND_MANAGERS"),
      (whoCanDeleteAnyPost = "OWNERS_AND_MANAGERS"),
      (whoCanDeleteTopics = "OWNERS_AND_MANAGERS"),
      (whoCanLockTopics = "OWNERS_AND_MANAGERS"),
      (whoCanMoveTopicsIn = "OWNERS_AND_MANAGERS"),
      (whoCanMoveTopicsOut = "OWNERS_AND_MANAGERS"),
      (whoCanPostAnnouncements = "OWNERS_AND_MANAGERS"),
      (whoCanHideAbuse = "NONE"),
      (whoCanMakeTopicsSticky = "NONE"),
      (whoCanModerateMembers = "OWNERS_AND_MANAGERS"),
      (whoCanModerateContent = "OWNERS_AND_MANAGERS"),
      (whoCanAssistContent = "NONE"),
      (customRolesEnabledForSettingsToBeMerged = "false"),
      (enableCollaborativeInbox = "false"),
      (whoCanDiscoverGroup = "ALL_IN_DOMAIN_CAN_DISCOVER")
    ];

    var success = AdminGroupsSettings.Groups.patch(settings, email);
  }
}

function doAddGoogleGroupMember(groupEmail, userEmail, role) {
  var member = {
    email: userEmail,
    role: role
  };
  try {
    member = AdminDirectory.Members.insert(member, groupEmail);
  } catch (error) {
    if (error.message == "Member already exists.") {
      Logger.log("User %s is already in the group %s", userEmail, groupEmail);
    } else {
      Logger.log(
        "Got some other error adding %s to %s: " + error.message,
        userEmail,
        groupEmail
      );
    }
  }
}
