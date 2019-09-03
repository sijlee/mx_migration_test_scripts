/**
 * This function takes the email address and builds a group from the domain used in the test account creation
 * @param email The email address for the test account created in createUsers_
 */
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
    var addUser = addUserToGroup_(email);
  }
}
